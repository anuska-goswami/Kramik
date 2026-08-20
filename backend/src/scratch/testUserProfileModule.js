import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import * as userService from '../services/user.service.js';

dotenv.config();

async function runProfileTests() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kramik';
  console.log('Connecting to MongoDB at:', mongoUri);
  await mongoose.connect(mongoUri);

  try {
    console.log('\n--- 1. Setup Test User ---');
    const testEmail = `profiletest_${Date.now()}@example.com`;
    const initialPassword = 'password123';
    const hashedPassword = await bcrypt.hash(initialPassword, 10);

    let testUser = await User.create({
      fullName: 'Profile Tester',
      email: testEmail,
      password: hashedPassword
    });
    console.log('Created test user:', testUser._id);

    console.log('\n--- 2. Test getUserProfile ---');
    const profile = await userService.getUserProfile(testUser._id);
    console.log('✔ Fetched Profile:', profile.fullName, profile.email);
    if (profile.password !== undefined) throw new Error('Security flaw: Password included in profile payload!');

    console.log('\n--- 3. Test updateUserProfile ---');
    const updatedProfile = await userService.updateUserProfile(testUser._id, {
      bio: 'Full Stack Engineer passionate about scalable architectures.',
      phone: '+1 555-0199',
      targetRole: 'Senior Backend Engineer',
      targetCompany: 'Google',
      experienceLevel: 'Advanced'
    });
    console.log('✔ Updated Profile Bio:', updatedProfile.bio);
    console.log('✔ Updated Target Role:', updatedProfile.targetRole);
    if (updatedProfile.targetCompany !== 'Google') throw new Error('Target company update failed!');

    console.log('\n--- 4. Test updateUserPreferences ---');
    const updatedPref = await userService.updateUserPreferences(testUser._id, {
      theme: 'dark',
      emailNotifications: false,
      dailyGoalMinutes: 45,
      preferredSubject: 'os'
    });
    console.log('✔ Updated Preferences:', updatedPref.preferences);
    if (updatedPref.preferences.dailyGoalMinutes !== 45) throw new Error('Preferences update failed!');

    console.log('\n--- 5. Test uploadUserProfilePicture ---');
    const mockImageBuffer = Buffer.from('fake-image-bytes');
    const uploadedPic = await userService.uploadUserProfilePicture(testUser._id, mockImageBuffer);
    console.log('✔ Uploaded Profile Picture URL:', uploadedPic.profilePicture.url.substring(0, 40) + '...');
    if (!uploadedPic.profilePicture.url) throw new Error('Profile picture upload failed!');

    console.log('\n--- 6. Test deleteUserProfilePicture ---');
    const deletedPic = await userService.deleteUserProfilePicture(testUser._id);
    console.log('✔ Profile Picture URL after reset:', deletedPic.profilePicture.url);
    if (deletedPic.profilePicture.url !== '') throw new Error('Delete profile picture failed!');

    console.log('\n--- 7. Test changeUserPassword ---');
    const newPassword = 'newPassword456';
    const changePwdResult = await userService.changeUserPassword(testUser._id, {
      currentPassword: initialPassword,
      newPassword
    });
    console.log('✔ Change Password Result:', changePwdResult.message);

    // Verify login with new password
    const userAfterPwd = await User.findById(testUser._id);
    const isValidNewPwd = await bcrypt.compare(newPassword, userAfterPwd.password);
    if (!isValidNewPwd) throw new Error('New password verification failed!');
    console.log('✔ Verified new password with bcrypt.');

    console.log('\n--- 8. Test deleteUserAccount ---');
    const deleteResult = await userService.deleteUserAccount(testUser._id, newPassword);
    console.log('✔ Account Deletion Result:', deleteResult.message);

    const checkDeleted = await User.findById(testUser._id);
    if (checkDeleted) throw new Error('User still exists after account deletion!');
    console.log('✔ User document successfully deleted from database.');

    console.log('\n✅ ALL USER PROFILE MODULE INTEGRATION TESTS PASSED PERFECTLY!\n');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected MongoDB.');
  }
}

runProfileTests();
