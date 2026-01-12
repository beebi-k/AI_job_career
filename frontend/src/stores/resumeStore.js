import { create } from 'zustand';

export const useResumeStore = create((set, get) => ({
  resumes: [],
  currentResume: null,
  isSaving: false,

  setResumes: (resumes) => set({ resumes }),

  addResume: (resume) => set((state) => ({
    resumes: [...state.resumes, resume]
  })),

  updateResume: (id, updatedResume) => set((state) => ({
    resumes: state.resumes.map(resume =>
      resume.id === id ? { ...resume, ...updatedResume } : resume
    ),
    currentResume: state.currentResume?.id === id
      ? { ...state.currentResume, ...updatedResume }
      : state.currentResume
  })),

  deleteResume: (id) => set((state) => ({
    resumes: state.resumes.filter(resume => resume.id !== id),
    currentResume: state.currentResume?.id === id ? null : state.currentResume
  })),

  setCurrentResume: (resume) => set({ currentResume: resume }),

  updateCurrentResume: (field, value) => set((state) => ({
    currentResume: state.currentResume
      ? { ...state.currentResume, [field]: value }
      : null
  })),

  setSaving: (isSaving) => set({ isSaving }),

  clearCurrentResume: () => set({ currentResume: null }),
}));