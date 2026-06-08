import { create } from "zustand";
import type { Country, Submission } from "../types";

interface FormStore {
  submissions: Submission[];
  countries: Country[];
  addSubmission: (
    submission: Omit<Submission, "id" | "submittedAt" | "isNew">,
  ) => void;
  markNotNew: (id: string) => void;
}

const DEFAULT_COUNTRIES: Country[] = [
  { name: "United States", code: "US" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Canada", code: "CA" },
  { name: "China", code: "CN" },
  { name: "Russia", code: "RU" },
];

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  countries: DEFAULT_COUNTRIES,

  addSubmission: (data) => {
    const submission: Submission = {
      ...data,
      id: crypto.randomUUID(),
      submittedAt: Date.now(),
      isNew: true,
    };
    set((state) => ({
      submissions: [submission, ...state.submissions],
    }));
  },

  markNotNew: (id) => {
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === id ? { ...s, isNew: false } : s,
      ),
    }));
  },
}));
