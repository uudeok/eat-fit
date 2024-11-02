'use client';

import styles from '@styles/modal/chatGPTModal.module.css';
import { useCookie, useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Modal } from '../common/Modal';
import { ListCol, Text } from '../common';
import { Button } from '../common/Button';
import { useFetchAnalysis, useFetchGoalsByStatus } from '@/service/queries';
import { useCallback, useEffect } from 'react';
import { useReportStore } from '@/shared/store/useReportStore';
import LoadingAnalysis from '../mypage/reports/LoadingAnalysis';
import { useCreateAnalysis, useUpdateAnalysis } from '@/service/mutations';
import { DecodeAnalysis } from '@/service/mappers/analysisMapper';
import { DecodeGoalType } from '@/service/mappers/goalMapper';
import { COOKIE_NAMES } from '@/constants';

const ChatGPTAnalysisModal = () => {
    const { isOpen, onClose } = useModal(ModalType.chatGPTAnalysis);
    const { progressionRate, weeklyWeight, calories, burnedCalories } = useReportStore();
    const { setCustomCookie, getCustomCookie, deleteCustomCookie, isCookieValid } = useCookie();

    const cachedData = getCustomCookie(COOKIE_NAMES.ANALYSIS) as DecodeAnalysis;
    const isValidCookie = isCookieValid(COOKIE_NAMES.ANALYSIS); // true 라면 아직 유효한 캐시다

    const { data: goalData } = useFetchGoalsByStatus('progress') as { data: DecodeGoalType };
    /* isValidCookie 가 true 라면 반대 false 보내서 API 요청 x, false 라면 반대 true 를 보내서 요청을 보낸다 */
    const { data: analysisData, isLoading } = useFetchAnalysis(!isValidCookie);

    const { mutateAsync: createAnalysis, isPending: isCreating } = useCreateAnalysis();
    const { mutateAsync: updateAnalysis, isPending: isUpdating } = useUpdateAnalysis();

    const setCookieAnalysisData = (newData: DecodeAnalysis) => {
        setCustomCookie({ name: COOKIE_NAMES.ANALYSIS, value: newData, expires: newData.deadline });
    };

    const createNewAnalysis = async () => {
        const newAnalysisData = prepareAnalysisData();
        const newData = await createAnalysis(newAnalysisData);
        setCookieAnalysisData(newData);
    };

    const updateExistingAnalysis = async () => {
        const updatedAnalysisData = {
            ...prepareAnalysisData(),
            id: analysisData!.id,
        };
        const newData = await updateAnalysis(updatedAnalysisData);

        deleteCustomCookie(COOKIE_NAMES.ANALYSIS);
        setCookieAnalysisData(newData);
    };

    const handleAnalysis = useCallback(async () => {
        if (isLoading || !goalData || isCreating || isUpdating) return;

        if (!cachedData && !analysisData) {
            await createNewAnalysis();
        } else if ((cachedData && !isValidCookie) || (!cachedData && analysisData)) {
            await updateExistingAnalysis();
        }
    }, [goalData, isLoading, cachedData, isValidCookie, isCreating, isUpdating]);

    const prepareAnalysisData = () => ({
        goalData,
        progressionRate,
        weeklyWeight,
        calories,
        burnedCalories,
    });

    useEffect(() => {
        handleAnalysis();
    }, [handleAnalysis]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                {isCreating || isLoading || isUpdating ? (
                    <LoadingAnalysis />
                ) : (
                    <div>
                        <div className={styles.header}>
                            <Text bold size="xxlg">
                                🎯 분석한 내용을 알려드릴게요
                            </Text>
                            <Text size="sm">분석은 일주일 간격으로 업데이트 됩니다‼️</Text>
                        </div>

                        <div className={styles.anaylsis}>
                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        🌟 목표 도달 가능성은?
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.possibility}>
                                        <Text bold size="xlg" color="var(--blue800)">
                                            {cachedData?.possibility}
                                        </Text>
                                    </div>
                                }
                            />

                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        🧐 평가
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.evaluates}>
                                        <Text bold color="var(--grey800)">
                                            {cachedData?.evaluates}
                                        </Text>
                                    </div>
                                }
                            />

                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        🍯 꿀팁
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.tips}>
                                        {cachedData?.tips.map((tip, idx) => (
                                            <Text key={idx} bold color="var(--grey800)">
                                                {idx + 1}. {tip}
                                            </Text>
                                        ))}
                                    </div>
                                }
                            />

                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        💪 힘내세용!
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.cheering}>
                                        <Text bold color="var(--grey800)">
                                            {cachedData?.cheering}
                                        </Text>
                                    </div>
                                }
                            />
                        </div>

                        <Button role="round" onClick={onClose}>
                            확인!
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ChatGPTAnalysisModal;

// 'use client';

// import styles from '@styles/modal/chatGPTModal.module.css';
// import { useCookie, useModal } from '@/hooks';
// import { ModalType } from '../common/Modal/OverlayContainer';
// import { Modal } from '../common/Modal';
// import { ListCol, Text } from '../common';
// import { Button } from '../common/Button';
// import { useFetchAnalysis, useFetchGoalsByStatus } from '@/service/queries';
// import { useCallback, useEffect } from 'react';
// import { useReportStore } from '@/shared/store/useReportStore';
// import LoadingAnalysis from '../mypage/reports/LoadingAnalysis';
// import { useCreateAnalysis, useUpdateAnalysis } from '@/service/mutations';
// import { DecodeAnalysis } from '@/service/mappers/analysisMapper';
// import { DecodeGoalType } from '@/service/mappers/goalMapper';
// import { COOKIE_NAMES } from '@/constants';

// const ChatGPTAnalysisModal = () => {
//     const { isOpen, onClose } = useModal(ModalType.chatGPTAnalysis);
//     const { progressionRate, weeklyWeight, calories, burnedCalories } = useReportStore();
//     const { setCustomCookie, getCustomCookie, deleteCustomCookie, isCookieValid } = useCookie();

//     const cachedData = getCustomCookie(COOKIE_NAMES.ANALYSIS) as DecodeAnalysis;
//     const isValidCookie = isCookieValid(COOKIE_NAMES.ANALYSIS); // true 라면 아직 유효한 캐시다

//     const { data: goalData } = useFetchGoalsByStatus('progress') as { data: DecodeGoalType };
//     /* isValidCookie 가 true 라면 반대 false 보내서 API 요청 x, false 라면 반대 true 를 보내서 요청을 보낸다 */
//     const { data: analysisData, isLoading } = useFetchAnalysis(!isValidCookie);

//     const { mutateAsync: createAnalysis, isPending: isCreating } = useCreateAnalysis();
//     const { mutateAsync: updateAnalysis, isPending: isUpdating } = useUpdateAnalysis();

//     const setCookieAnalysisData = (newData: DecodeAnalysis) => {
//         setCustomCookie({ name: COOKIE_NAMES.ANALYSIS, value: newData, expires: newData.deadline });
//     };

//     const createNewAnalysis = async () => {
//         const newAnalysisData = prepareAnalysisData();
//         const newData = await createAnalysis(newAnalysisData);
//         setCookieAnalysisData(newData);
//     };

//     const updateExistingAnalysis = async () => {
//         const updatedAnalysisData = {
//             ...prepareAnalysisData(),
//             id: analysisData!.id,
//         };
//         const newData = await updateAnalysis(updatedAnalysisData);

//         deleteCustomCookie(COOKIE_NAMES.ANALYSIS);
//         setCookieAnalysisData(newData);
//     };

//     const handleAnalysis = useCallback(async () => {
//         if (isLoading || !goalData) return;

//         if (!cachedData) {
//             await createNewAnalysis();
//         } else if (cachedData && !isValidCookie) {
//             await updateExistingAnalysis();
//         }
//     }, [goalData, isLoading, cachedData, isValidCookie]);

//     const prepareAnalysisData = () => ({
//         goalData,
//         progressionRate,
//         weeklyWeight,
//         calories,
//         burnedCalories,
//     });

//     useEffect(() => {
//         handleAnalysis();
//     }, [handleAnalysis]);

//     return (
//         <Modal isOpen={isOpen} onClose={onClose}>
//             <div className={styles.layout}>
//                 {isCreating || isLoading || isUpdating ? (
//                     <LoadingAnalysis />
//                 ) : (
//                     <div>
//                         <div className={styles.header}>
//                             <Text bold size="xxlg">
//                                 🎯 분석한 내용을 알려드릴게요
//                             </Text>
//                             <Text size="sm">분석은 일주일 간격으로 업데이트 됩니다‼️</Text>
//                         </div>

//                         <div className={styles.anaylsis}>
//                             <ListCol
//                                 top={
//                                     <Text bold size="xlg">
//                                         🌟 목표 도달 가능성은?
//                                     </Text>
//                                 }
//                                 bottom={
//                                     <div className={styles.possibility}>
//                                         <Text bold size="xlg" color="var(--blue800)">
//                                             {cachedData?.possibility}
//                                         </Text>
//                                     </div>
//                                 }
//                             />

//                             <ListCol
//                                 top={
//                                     <Text bold size="xlg">
//                                         🧐 평가
//                                     </Text>
//                                 }
//                                 bottom={
//                                     <div className={styles.evaluates}>
//                                         <Text bold color="var(--grey800)">
//                                             {cachedData?.evaluates}
//                                         </Text>
//                                     </div>
//                                 }
//                             />

//                             <ListCol
//                                 top={
//                                     <Text bold size="xlg">
//                                         🍯 꿀팁
//                                     </Text>
//                                 }
//                                 bottom={
//                                     <div className={styles.tips}>
//                                         {cachedData?.tips.map((tip, idx) => (
//                                             <Text key={idx} bold color="var(--grey800)">
//                                                 {idx + 1}. {tip}
//                                             </Text>
//                                         ))}
//                                     </div>
//                                 }
//                             />

//                             <ListCol
//                                 top={
//                                     <Text bold size="xlg">
//                                         💪 힘내세용!
//                                     </Text>
//                                 }
//                                 bottom={
//                                     <div className={styles.cheering}>
//                                         <Text bold color="var(--grey800)">
//                                             {cachedData?.cheering}
//                                         </Text>
//                                     </div>
//                                 }
//                             />
//                         </div>

//                         <Button role="round" onClick={onClose}>
//                             확인!
//                         </Button>
//                     </div>
//                 )}
//             </div>
//         </Modal>
//     );
// };

// export default ChatGPTAnalysisModal;
