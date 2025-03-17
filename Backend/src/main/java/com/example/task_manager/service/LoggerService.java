package com.example.task_manager.service;

import com.example.task_manager.dto.WorkActivity;

import java.util.List;

public interface LoggerService {
    WorkActivity createLog(WorkActivity workActivity);

    WorkActivity getLogById(Long logId);

    WorkActivity updateLog(Long logId, WorkActivity workActivity);

    WorkActivity deleteLog(Long logId);

    List<WorkActivity> getAllLogs();
}
