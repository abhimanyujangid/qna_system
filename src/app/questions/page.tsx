import { databases, users } from '@/models/server/config';
import { answerCollection, db, voteCollection, questionCollection } from '@/models';
import { Query } from 'node-appwrite';
import React from 'react';
import Link from 'next/link';
import ShimmerButton from '@/components/magicui/shimmer-button';
import QuestionCard from '@/components/QuestionCard';
import { UserPrefs } from '@/store/Auth';
import Pagination from '@/components/Pagination';
import Search from './Search';
import { unstable_noStore as noStore } from 'next/cache';

const Page = async ({
    searchParams,
}: {
    searchParams: { page?: string; tag?: string; search?: string };
}) => {
    searchParams.page ||= '1';

    noStore();

    const queries = [
        Query.orderDesc('$createdAt'),
        Query.offset((+searchParams.page - 1) * 25),
        Query.limit(25),
    ];

    if (searchParams.tag) queries.push(Query.equal('tags', searchParams.tag));
    if (searchParams.search)
        queries.push(
            Query.or([
                Query.search('title', searchParams.search),
                Query.search('content', searchParams.search),
            ])
        );

    const questions = await databases.listDocuments(db, questionCollection, queries);
    console.log('Questions', questions.total);

    questions.documents = await Promise.all(
        questions.documents.map(async (ques) => {
            const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                    Query.equal('questionId', ques.$id),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal('type', 'question'),
                    Query.equal('typeId', ques.$id),
                    Query.limit(1), // for optimization
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                    $id: author.$id,
                    reputation: author.prefs.reputation,
                    name: author.name,
                },
            };
        })
    );

    return (
        <div className='container mx-auto px-4 py-10 space-y-10'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>All Questions</h1>
                <Link href='/questions/ask'>
                    <ShimmerButton className='shadow-2xl'>
                        <span className='whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg'>
                            Ask a question
                        </span>
                    </ShimmerButton>
                </Link>
            </div>
            <Search />
            <div className='mb-4 max-w-3xl space-y-6'>
                <h2 className='text-xl font-bold'>{questions.total} Questions</h2>
                {questions.documents.map((ques) => (
                    <QuestionCard key={ques.$id} ques={ques} />
                ))}
            </div>
            <Pagination total={questions.total} limit={25} />
        </div>
    );
};

export default Page;
