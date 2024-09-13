// types related to the forms

export type TSignupFormValues = {
  name: string;
  phone: number;
  email: string;
  password: string;
};

export type TLoginFormValues = {
  email: string;
  password: string;
};

// types related to the stories

export type TStories = {
  stories: TStory[];
  userId: string;
  username: string;
  _id: string;
};

export type TStoryDetails = {
  message: string;
  image: string;
};

export type TStory = {
  message: string;
  image: string;
  _id: string;
  likes: TStoryLikes;
  createdAt: string;
  userId: string;
  username: string;
};

export type TStoryLike = {
  name: string;
  userId: string;
  _id: string;
};

export type TStoryLikes = TStoryLike[];

// types related to the quiz

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


// types related to the posts
export type TComment = {
  name: string;
  email: string;
  body: string
}


export type TPost = {
  title: string;
  id: string
}
