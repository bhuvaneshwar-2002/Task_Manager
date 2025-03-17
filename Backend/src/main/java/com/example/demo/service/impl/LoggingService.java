package com.example.demo.service.impl;

import com.example.demo.dto.WorkActivity;
import com.example.demo.entity.Logging;
import com.example.demo.repository.LogRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.LoggerService;
import lombok.AllArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class LoggingService implements LoggerService {

    private final LogRepository logRepository;


    @Override
    public WorkActivity createLog(WorkActivity workActivity) {
        Logging logging = new Logging();
        logging.setUsername(workActivity.getUsername());
        logging.setTaskName(workActivity.getTaskName());
        logging.setDescription(workActivity.getDescription());
        logging.setStatus(workActivity.getStatus());
        logging.setStartTime(workActivity.getStartTime());
        logging.setEndTime(workActivity.getEndTime());
        logging.setDuration(workActivity.getDuration());

        // Save the logging entity and get the saved entity with generated ID
        Logging savedLogging = logRepository.save(logging);

        // Set the generated ID back to WorkActivity
        workActivity.setId(savedLogging.getId());

        return workActivity;
    }


    @Override
    public WorkActivity getLogById(Long logId) {
        Logging logging = logRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Log not found with id: " + logId));
        // Convert Logging entity to WorkActivity DTO
        WorkActivity workActivity = new WorkActivity();
        workActivity.setId(logging.getId());
        workActivity.setUsername(logging.getUsername());
        workActivity.setTaskName(logging.getTaskName());
        workActivity.setDescription(logging.getDescription());
        workActivity.setStatus(logging.getStatus());
        workActivity.setStartTime(logging.getStartTime());
        workActivity.setEndTime(logging.getEndTime());
        workActivity.setDuration(logging.getDuration());
        return workActivity;
    }

    @Override
    public WorkActivity updateLog(Long logId, WorkActivity workActivity) {
        Logging logging = logRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Log not found with id: " + logId));
        if (logging != null) {
            logging.setUsername(workActivity.getUsername());
            logging.setTaskName(workActivity.getTaskName());
            logging.setDescription(workActivity.getDescription());
            logging.setStatus(workActivity.getStatus());
            logging.setStartTime(workActivity.getStartTime());
            logging.setEndTime(workActivity.getEndTime());
            logging.setDuration(workActivity.getDuration());
            Logging updatedLogging = logRepository.save(logging);
            // Set the updated ID back to WorkActivity
            workActivity.setId(updatedLogging.getId());
            return workActivity;
        }
        return null;
    }

    @Override
    public WorkActivity deleteLog(Long logId) {
        Logging logging = logRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Log not found with id: " + logId));
        if (logging != null) {
            logRepository.delete(logging);
            // Convert Logging entity to WorkActivity DTO
            WorkActivity workActivity = new WorkActivity();
            workActivity.setId(logging.getId());
            workActivity.setUsername(logging.getUsername());
            workActivity.setTaskName(logging.getTaskName());
            workActivity.setDescription(logging.getDescription());
            workActivity.setStatus(logging.getStatus());
            workActivity.setStartTime(logging.getStartTime());
            workActivity.setEndTime(logging.getEndTime());
            workActivity.setDuration(logging.getDuration());
            return workActivity;
        }
        return null;
    }

    @Override
    public List<WorkActivity> getAllLogs() {
        List<Logging> loggings = logRepository.findAll();
        List<WorkActivity> workActivities = loggings.stream()
                .map(logging -> {
                    WorkActivity workActivity = new WorkActivity();
                    workActivity.setId(logging.getId());
                    workActivity.setUsername(logging.getUsername());
                    workActivity.setTaskName(logging.getTaskName());
                    workActivity.setDescription(logging.getDescription());
                    workActivity.setStatus(logging.getStatus());
                    workActivity.setStartTime(logging.getStartTime());
                    workActivity.setEndTime(logging.getEndTime());
                    workActivity.setDuration(logging.getDuration());
                    return workActivity;
                })
                .collect(Collectors.toList());
        return workActivities;
    }
}
