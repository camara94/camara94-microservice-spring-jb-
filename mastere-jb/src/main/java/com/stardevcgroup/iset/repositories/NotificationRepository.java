package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.Notification;



public interface NotificationRepository extends JpaRepository<Notification, Long> {
	public Notification  getNotificationById( Long id );
}
