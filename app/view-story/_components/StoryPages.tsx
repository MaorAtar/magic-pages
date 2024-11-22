import React from 'react'
import { MdOutlinePlayCircleFilled } from "react-icons/md";

function StoryPages({storyChapter}:any) {
const playSpeech = (text:string) => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const hebrewVoice = voices.find(voice => voice.lang === "he-IL");

  if (hebrewVoice) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = hebrewVoice;
    synth.speak(utterance);
  }
};


  return (
    <div>
        <h2 className='text-2xl text-right fontbold text-primary flex justify-between'>{storyChapter?.chapter_title}
            <span className='text-3xl cursor-pointer' onClick={()=>playSpeech(storyChapter?.text)}><MdOutlinePlayCircleFilled /></span>
        </h2>
        <p dir="rtl" className='text-xl text-black p-10 mt-3 rounded-lg bg-slate-100'>
            {storyChapter?.text}
        </p>
    </div>
  )
}

export default StoryPages