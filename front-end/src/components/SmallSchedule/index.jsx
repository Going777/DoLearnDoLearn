import React, { useContext, useEffect, useState } from "react";
import { SContainer, SEmptyNotice } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { Scrollbars } from "react-custom-scrollbars";
import TodayScheduleItem from "../TodayScheduleItem";
import TotalScheduleItem from "../TotalScheduleItem";
import { LoginStateContext } from "../../App";
import { getFixedLecture, getRequestLecture } from "../../utils/api/userAPI";

const SmallSchedule = () => {
  const { userInfo } = useContext(LoginStateContext);

  const [todaySchedule, setTodayScedule] = useState([]);
  const [totalSchedule, setTotalSchedule] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // 유저의 확정된 강의 목록 api를 요청하는 함수
    getFixedLecture(userInfo, setTodayScedule);

    // 유저가 신청한 전체 목록 api를 요청하는 함수
    getRequestLecture(userInfo, setTotalSchedule);
  }, []);

  useEffect(() => {
    if (todaySchedule.length === 0 && totalSchedule.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [todaySchedule, totalSchedule]);

  return (
    <SContainer
      isEmpty={isEmpty}
      isIncreaseTotalScheduleHight={totalSchedule.length}
      isIncreaseTodayScheduleHight={todaySchedule.length}
    >
      <div className="header">
        <p>오늘의 일정</p>
        <p>{`${new Date().getMonth() + 1}월 ${new Date().getDate()}일`}</p>
      </div>
      {isEmpty ? (
        <SEmptyNotice>
          <div>배우고 싶은 강의를 신청하세요 😊</div>
        </SEmptyNotice>
      ) : (
        <>
          <div
            className={
              todaySchedule.length ? "todaySchedule" : "todaySchedule empty"
            }
          >
            {todaySchedule.length ? (
              <Scrollbars autoHide className="Scrollbars">
                {/* key 수정해야 됨 */}
                {todaySchedule.map((item, idx) => (
                  <TodayScheduleItem key={idx} item={item} />
                ))}
              </Scrollbars>
            ) : (
              <SEmptyNotice>
                <div>배우고 싶은 강의를 신청하세요 😊</div>
              </SEmptyNotice>
            )}
          </div>
          <div className="boundary"></div>
          <p className="totalSchedule__header">신청 내역</p>
          <div
            className={
              totalSchedule.length ? "totalSchedule" : "totalSchedule empty"
            }
          >
            {totalSchedule.length ? (
              <Scrollbars autoHide className="Scrollbars">
                {totalSchedule.map((item) => (
                  <TotalScheduleItem key={item} item={item} />
                ))}
              </Scrollbars>
            ) : (
              <SEmptyNotice>
                <div>배우고 싶은 강의를 신청하세요 😊</div>
              </SEmptyNotice>
            )}
          </div>
        </>
      )}
    </SContainer>
  );
};

export default SmallSchedule;
