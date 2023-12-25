// story section

export type TStoryDetails = {
  message: string;
  image: string;
};

export type TStoryType = {
  message: string;
  stories: { message: string; image: string; _id: string }[];
  userId: {
    _id?: string;
    name: string;
  };
  createdAt: string;
};

export type TShowStoryType2 = {
  type: string;
  userId: string | undefined;
  isShow: boolean;
};

export type TStory2 = {
  username?: string;
  type: string;
  show: boolean;
  images: { image: string }[];
  message: string;
  postDate: string;
};

// quiz seciton =================

export type TActiveQuestionType = {
  question: string;
  answer: string;
  options: string[];
};

export type TAnswerList = {
  id: number;
  answer: string;
};

export type TQuizResullt = {
  result: number;
  total: number;
  attempted: number;
  unattempted: number;
  right: number;
};
