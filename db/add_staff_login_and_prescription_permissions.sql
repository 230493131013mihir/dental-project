ALTER TABLE `user`
  ADD COLUMN IF NOT EXISTS `password` varchar(255) NOT NULL DEFAULT '123456' AFTER `email`;

UPDATE `user`
SET `role_id` = 'Admin'
WHERE `role_id` IN ('admin', 'ADMIN');

INSERT INTO `user`
  (`branch_id`, `department_id`, `role_id`, `name`, `dob`, `email`, `password`, `qualification`, `address`, `salary`, `user_img`)
SELECT
  COALESCE((SELECT `id` FROM `branch` ORDER BY `id` LIMIT 1), 0),
  COALESCE((SELECT `id` FROM `department` ORDER BY `id` LIMIT 1), 0),
  'Admin',
  'Admin',
  '2026-01-01',
  'admin@gmail.com',
  '123456',
  'Admin',
  'Dental Clinic',
  0,
  'public\\user_img\\1776319440136-934335246-doctor1.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM `user` WHERE `email` = 'admin@gmail.com'
);

-- Existing staff users can log in with password 123456 until their password is changed.
-- Doctors are only allowed to add prescriptions for appointments where appointment.doctor_id = user.id.
-- Admin users are allowed to add prescriptions for any appointment.
