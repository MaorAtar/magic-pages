const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "create kids story (in Hebrew language) on description for 5-8 Years kids, Educational story, and all images in Paper cut style: story of boy and Magic School, give me 5 chapters, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "## סיפור קסום:  הילד והבית ספר קסום\n\n**JSON פורמט**\n\n```json\n{\n  \"story_name\": \"הילד והבית ספר קסום\",\n  \"cover_image\": {\n    \"description\": \"ילד קטן עם עיניים בורקות, לבוש בבגדים כחולים, עומד מול בית ספר עשוי מלבנים צבעוניות.  גג הבית ספר מעוטר בכוכבים נוצצים.  בידו של הילד מחזיק ספר כישוף פתוח עם עמודי נייר רכים ומלאי צבע.\",\n    \"style\": \"Paper cut\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_title\": \"הילד שאהב סיפורי קסמים\",\n      \"text\": \"פעם, היה ילד בשם נועם שחלם להיות קוסם.  כל יום, נועם היה מתעורר בבוקר ומתחיל לחפש סיפורי קסמים בספריה.  הוא אהב לקרוא על יצורים קסומים, על שרביטים קסומים, ועל כישופים מופלאים.\",\n      \"image\": {\n        \"description\": \"נועם, ילד קטן עם שיער חום ותלתלים, יושב על שטיח צבעוני בחדר קטן מלא ספרים.  מולו, שולחן עץ מלא בספרים פתוחים שמוצגים עליהם תמונות של יצורים מיתולוגיים, שרביטים מנצנצים וכישופים מופלאים.  בידו של נועם מחזיק ספר גדול ומלא איורים.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"הבית ספר קסום\",\n      \"text\": \"יום אחד, נועם קרא על בית ספר קסום שמוכן ללמד ילדים להיות קוסמים!  בית הספר היה נסתר בעיניים לא קשובות, ובשביל למצוא אותו צריך היה לעבור דרך שער סודי.  נועם החליט שהוא חייב ללכת לבית הספר!\",\n      \"image\": {\n        \"description\": \"נוף ירוק של יער מלא עצים גבוהים.  בין העצים, נראה שער מעץ ישן עם ידיות זהב.  על השער כתוב: 'בית ספר קסום'.  בתוך השער, נראה בית קטן ומקסים עם גג אדום וחרור גג בצורת כוכב.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"הכיתה המיוחדת\",\n      \"text\": \"נועם מצא את בית הספר הקסום והצליח להיכנס.  הוא נכנס לכיתה מיוחדת מלאה בקסמים.  היו שם שולחנות מעופפים, עטים קסומים שכותבים לבד, וספרים שקופצים על המדפים.  נועם היה מרותק מכל מה שראה!\",\n      \"image\": {\n        \"description\": \"כיתה עגולה עם שולחנות מעופפים.  על השולחנות, ספרים שקופצים על המדפים וחצים קסומים פורצים מהם.  במרכז הכיתה, מורה קסום בעל זקן לבן ארוך מלמד קבוצת ילדים איך להפעיל שרביטים קסומים.  נועם עומד ליד השולחן, מחזיק שרביט קסום בידיו, ומנסה לבצע קסם ראשון.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"לימודי קסמים\",\n      \"text\": \"נועם למד איך להפעיל שרביטים קסומים, איך לעשות כישופים פשוטים, איך לטוס על מטאטא, ואיך לגדל פרחים קסומים.  הוא היה תלמיד מצטיין, והצליח בכל המשימות שהוטלו עליו.\",\n      \"image\": {\n        \"description\": \"נועם, לבוש בגלימה כחולה, עומד על מטאטא קסום ומטיס מעל שדות ירוקים.  בידיו מחזיק שרביט קסום שמחזיק פרח גדול וצבעוני.  לידו, ילדים אחרים עפים על מטאטאים, משחקים עם שרביטים ומגדלים פרחים צבעוניים.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"הקסם הגדול\",\n      \"text\": \"בסוף השנה, נועם הצליח להשלים את כל קורסי הקסמים והיה מוכן לקסם הגדול.  הוא למד לעשות קסם מיוחד שיהפוך את כל העולם לצבעוני יותר.  הוא הציג את הקסם בפני כל התלמידים בבית הספר והצליח!  הוא היה גאה מאוד בעצמו.\",\n      \"image\": {\n        \"description\": \"נועם עומד על במה גדולה, מחזיק שרביט קסום ומביט על קהל גדול של ילדים.  הוא לובש גלימה צבעונית ומציג קסם מיוחד שמשנה את צבע העולם.  בתוך התיאטרון, עננים אפורים הופכים לבנים, שמש אפורה הופכת לזהובה, ועצים חומים הופכים לירוקים.\",\n        \"style\": \"Paper cut\"\n      }\n    }\n  ]\n}\n```\n\n**הערות:**\n\n*  **תיאור תמונות**:  שימו לב לפרטים קטנים בתמונות כדי לתת לילדים הרגשה שהם נכנסים לעולם הקסום של הסיפור. \n*  **סגנון נייר חתוך**:  השתמשו בצורות פשוטות וצבעים עזים כדי ליצור תחושה צעירה ושובבה.\n*  **אורך הסיפור**:  אורך הסיפור מותאם לילדים בגילאים 5-8. \n*  **ערכים חינוכיים**: הסיפור מעודד חיפוש ידע, יצירתיות, וביטחון עצמי.\n"},
          ],
        },
      ],
    });
  
