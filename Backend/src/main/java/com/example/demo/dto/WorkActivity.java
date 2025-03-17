package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
@NoArgsConstructor
public class WorkActivity {
    private Long id;
    private String username;
    private String taskName;
    private String description;
    private String status;
    private String startTime;
    private String endTime;
    private Long duration;
}
