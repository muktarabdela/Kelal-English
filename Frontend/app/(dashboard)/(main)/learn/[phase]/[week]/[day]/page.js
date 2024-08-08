'use client';
import { getDailyLesson, getInteractiveExercise } from '@/api/lessonApi';
import InterActive from '@/components/learn/interActive/InterActive';
import { fetchUserProgress } from '@/store/UserSlice';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DayDetailsPage = () => {
    const dispatch = useDispatch();
    const { userProgressDataLoading, error, userProgressData: progress } = useSelector((state) => state.user);
    const [lessons, setLessons] = useState([]);
    const [interactiveExercise, setInteractiveExercise] = useState({});

    const user = useSelector((state) => state.ui.user);
    const slug = user?.userId;
    useEffect(() => {
        if (slug) {
            dispatch(fetchUserProgress(slug));
        }
    }, [dispatch, slug]);

    const id = progress?.currentDay?._id;

    useEffect(() => {
        const fetchDailyLessons = async () => {
            try {
                const response = await getDailyLesson(id);
                const lessonId = response.data[0]._id;
                setLessons(response.data);
                if (lessonId) {
                    const response = await getInteractiveExercise(lessonId);
                    setInteractiveExercise(response.data);
                }
            } catch (error) {
                console.error('Error fetching daily lessons:', error);
            }
        }
        if (id) {
            fetchDailyLessons();
        }
    }, [id]);

    const { phase, week, day } = useParams();


    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Day Details</h1>
                {lessons.length > 0 && (
                    <div >
                        <h2 className="text-xl font-semibold mb-2">{lessons[0].mainTopic}</h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Grammar Topic</h3>
                            <p className="text-gray-700">{lessons[0].grammarTopic.explanation}</p>
                            <ul className="list-disc list-inside">
                                {lessons[0].grammarTopic.examples.map((example, index) => (
                                    <li key={index} className="text-gray-700">{example}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Vocabulary Topic</h3>
                            <p className="text-gray-700">{lessons[0].vocabularyTopic.explanation}</p>
                            <ul className="list-disc list-inside">
                                {lessons[0].vocabularyTopic.examples.map((example, index) => (
                                    <li key={index} className="text-gray-700">{example}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="mt-6">
                    <h1 className="text-3xl font-bold mb-4">Inter active Exercise</h1>
                    <InterActive interactiveExercise={interactiveExercise} />
                </div>
            </div>
        </div>
    );
};

export default DayDetailsPage;
