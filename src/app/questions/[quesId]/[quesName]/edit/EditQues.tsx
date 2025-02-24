'use client';

import QuestionForm from '@/components/QuestionForm';
import { useAuthStore } from '@/store/Auth';
import slugify from '@/utils/slugify';
import { Models } from 'appwrite';
import { useRouter } from 'next/navigation';
import React from 'react';

const EditQues = ({ question }: { question: Models.Document }) => {
    const { user } = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if (question.authorId !== user?.$id) {
            router.push(`/questions/${question.$id}/${slugify(question.title)}`);
        }
    }, [question.$id, question.title, question.authorId, router, user?.$id]);

    if (user?.$id !== question.authorId) return null;

    return (
        <div className='px-5'>
            <h1 className='mb-4 text-2xl'>Edit your public question</h1>
            <QuestionForm question={question} />
        </div>
    );
};

export default EditQues;
