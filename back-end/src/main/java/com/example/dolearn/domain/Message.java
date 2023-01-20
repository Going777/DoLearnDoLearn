package com.example.dolearn.domain;

import com.example.dolearn.dto.MessageDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity(name="message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name="rid")
    private User user;

    @Column(length=100,nullable = false)
    private String content;

    @Column(name="is_checked", columnDefinition = "TINYINT", length=1)
    private int isChecked;

    @Column(name="created_time")
    @CreationTimestamp
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdTime;

    @Column(name="check_time")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date checkTime; //메세지 확인 시간

    @Builder
    public Message(String content,Date checkTime,int isChecked) {
        this.content = content;;
        this.isChecked = isChecked;
        this.checkTime = checkTime;
    }
    //check상태 업데이트
    public void update(int check,Date checkTime) {
        this.isChecked = check;
        this.checkTime = checkTime;
    }

    //user 연관관계 편의 메소드
    public void setUser(User user) {
        if(this.user != null) {
            this.user.getMessageList().remove(this);
        }

        this.user = user;
        user.getMessageList().add(this);
    }

    public MessageDto toMessageDto() {
        return MessageDto.builder()
                .id(this.id)
                .rid(user.getId())
                .content(this.content)
                .isChecked(this.isChecked)
                .createdTime(this.createdTime)
                .checkTime(this.checkTime).build();
    }
}
