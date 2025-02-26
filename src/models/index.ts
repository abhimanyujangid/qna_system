// collections and databases names
export const db = 'stack-overflow'; // main-stackflow
export const questionCollection = 'questions';
export const answerCollection = 'answers';
export const commentCollection = 'comments';
export const voteCollection = 'votes';
export const questionAttachmentBucket = 'question-attachment';

// environment variable
export const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey: String(process.env.APPWRITE_API_KEY),
    },
};


// server file