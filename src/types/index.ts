export interface FormData {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  image: string;
  terms: boolean;
}

export interface Submission extends FormData {
  id: string;
  submittedAt: number;
  isNew?: boolean;
}

export interface Country {
  name: string;
  code: string;
}
