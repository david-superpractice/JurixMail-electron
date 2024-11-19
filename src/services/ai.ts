export const ai = {
  generateResponse: async (prompt: string) => {
    return window.electron.ai.generateResponse(prompt);
  },
  
  analyzeEmail: async (emailContent: string) => {
    const prompt = `Analyze this email and suggest a response: ${emailContent}`;
    return window.electron.ai.generateResponse(prompt);
  },
  
  suggestFolders: async (emails: any[]) => {
    const prompt = `Analyze these emails and suggest folder organization: ${JSON.stringify(emails)}`;
    return window.electron.ai.generateResponse(prompt);
  }
};