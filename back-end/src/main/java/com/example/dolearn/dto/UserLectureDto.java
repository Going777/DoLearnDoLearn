package com.example.dolearn.dto;

import com.example.dolearn.domain.Lecture;
import com.example.dolearn.domain.User;
import com.example.dolearn.domain.UserLecture;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserLectureDto {

    private Long id;

    private Long lid;

    private Long uid;

    private User user;

    private Lecture lecture;

    private String memberType;

    public UserLecture toEntity(){
        return UserLecture.builder()
                .id(id).lecture(lecture).user(user).memberType(memberType).build();
    }
}
