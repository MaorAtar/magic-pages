"use client";

import React, { useContext, useState } from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/GeminiAi';
import { db } from '@/config/db';
import { StoryData, Users } from '@/config/schema';
import uuid4 from "uuid4";
import CustomLoader from './_components/CustomLoader';
import axios from 'axios';
import { storage } from "@/config/firebaseConfig"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { UserDetailContext } from '../_context/UserDetailContext';
import { eq } from 'drizzle-orm';

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

function CreateStory() {
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const notify = (msg:string) => toast(msg);
  const notifyError = (msg:string) => toast.error(msg);
  const {user} = useUser();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
    console.log(formData);
  };

  const GenerateStory = async () => {
    if(userDetail.credit <= 0) {
      notifyError('!אין לך מספיק מטבעות');
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = CREATE_STORY_PROMPT
      ?.replace('{ageGroup}', formData?.ageGroup ?? '')
      .replace('{storyType}', formData?.storyType ?? '')
      .replace('{storySubject}', formData?.storySubject ?? '')
      .replace('{imageStyle}', formData?.imageStyle ?? '');

    // Generate AI Story
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response.text());
      
      // Translate story details
      const translatedStoryName = await translateText(story?.story_name);
      const translatedDescription = await translateText(story?.cover_image?.description);
      const translatedStyle = await translateText(story?.cover_image?.style);

      const imageResp = await axios.post('/api/generate-image', {
        prompt: `Add text with title: ${translatedStoryName} in bold text for book cover, ${translatedDescription}, Style: ${translatedStyle}`
      });

      const AiImageUrl = imageResp?.data?.imageUrl;

      // Upload image to Firebase Storage
      const FirebaseStorageImageUrl = await uploadImageToFirebase(AiImageUrl);

      const resp:any = await SaveInDB(result?.response.text(), FirebaseStorageImageUrl);
      console.log(resp);
      router?.replace('/view-story/' + resp[0].storyId);
      notify("!סיפור נוצר בהצלחה");
      await UpdateUserCredits();
      setLoading(false);
    } catch (e) {
      console.log(e);
      notifyError('שגיאה, אנא נסה שוב')
      setLoading(false);
    }
    
  };

  const SaveInDB=async(output:string, imageUrl:string)=>{
    const recordId=uuid4();
    setLoading(true);
    try {
      const result = await db.insert(StoryData).values({
        storyId:recordId,
        ageGroup:formData?.ageGroup,
        imageStyle:formData?.imageStyle,
        storySubject:formData?.storySubject,
        storyType:formData?.storyType,
        output:JSON.parse(output),
        coverImage:imageUrl,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userImage:user?.imageUrl,
        userName:user?.fullName
      }).returning({storyId:StoryData?.storyId})
      setLoading(false);
      return result;
    } catch(e) {
      notifyError('שגיאה, אנא נסה שוב')
      setLoading(false);
    }
  }

  const UpdateUserCredits = async () => {
    const result = await db.update(Users).set({
      credit: Number(userDetail?.credit-1)
    }).where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress??''))
    .returning({id:Users.id})
  }

  const uploadImageToFirebase = async (imageUrl: string) => {
    try {
      const imageData = await downloadImage(imageUrl);
      if (!imageData) throw new Error("Failed to download image");

      const fileName = `images/${uuid4()}.png`; // Unique filename
      const imageRef = ref(storage, fileName);

      await uploadBytes(imageRef, imageData);

      const downloadUrl = await getDownloadURL(imageRef);

      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      notifyError('שגיאה, אנא נסה שוב')
      throw error;
    }
  };

  const downloadImage = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      return Buffer.from(response.data);
    } catch (error) {
      console.error("Error downloading image:", error);
      notifyError('שגיאה, אנא נסה שוב')
      return null;
    }
  };

  const translateText = async (text: string): Promise<string | null> => {
    try {
      const translationPrompt = `Translate the following text from Hebrew to English:\n\n"${text}"`;
      const translationResult = await chatSession.sendMessage(translationPrompt);
      const translatedText = translationResult?.response.text().trim();
      return translatedText || null;
    } catch (error) {
      console.error("Translation error:", error);
      notifyError('שגיאה, אנא נסה שוב')
      return null;
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-40">
      <h2 className="font-extrabold text-[70px] text-primary text-center">צור סיפור</h2>
      <p className="text-2xl text-primary text-center">!השתמשו ביצירתיות ובבינה מלאכותית כדי ליצור סיפורים קסומים ומותאמים אישית לילדיכם - מסעות דמיון שנבנים בלחיצת כפתור</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
        <StorySubjectInput userSelection={onHandleUserSelection} />
        <StoryType userSelection={onHandleUserSelection} />
        <AgeGroup userSelection={onHandleUserSelection} />
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className="flex justify-end my-10 flex-col items-end">
        <Button color="primary" className="p-10 text-2xl" disabled={loading} onClick={GenerateStory}>
          צור סיפור
        </Button>
        <span>עלות של מטבע 1 לשימוש</span>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
}

export default CreateStory;
