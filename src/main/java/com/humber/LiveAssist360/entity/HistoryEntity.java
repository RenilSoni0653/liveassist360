package com.humber.LiveAssist360.entity;

import com.humber.LiveAssist360.models.Representative;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "history")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int historyID;

    @ManyToOne()
    @JoinColumn(name = "representativeID", referencedColumnName = "representativeID")
    private RepresentativeEntity representativeID;
    private int customerID;
    private String startTime;
    private String endTime;
}
