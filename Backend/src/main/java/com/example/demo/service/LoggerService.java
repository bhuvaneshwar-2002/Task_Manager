package com.example.demo.service;

import com.example.demo.dto.WorkActivity;

import java.util.List;

public interface LoggerService {
    WorkActivity createLog(WorkActivity workActivity);

    WorkActivity getLogById(Long logId);

    WorkActivity updateLog(Long logId, WorkActivity workActivity);

    WorkActivity deleteLog(Long logId);

    List<WorkActivity> getAllLogs();
}
