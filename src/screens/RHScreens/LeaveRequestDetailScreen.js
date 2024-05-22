// screens/LeaveRequestDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const LeaveRequestDetailScreen = ({ route, navigation }) => {
  const { requestId } = route.params;
  const [leaveRequest, setLeaveRequest] = useState(null);

  useEffect(() => {
    axios.get(`http://your-api-url.com/leave-requests/${requestId}`)
      .then(response => setLeaveRequest(response.data))
      .catch(error => console.error(error));
  }, [requestId]);

  const handleApprove = () => {
    axios.patch(`http://your-api-url.com/leave-requests/${requestId}`, { status: 'approved' })
      .then(() => navigation.goBack())
      .catch(error => console.error(error));
  };

  const handleReject = () => {
    axios.patch(`http://your-api-url.com/leave-requests/${requestId}`, { status: 'rejected' })
      .then(() => navigation.goBack())
      .catch(error => console.error(error));
  };

  if (!leaveRequest) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Reason: {leaveRequest.reason}</Text>
      <Text>Start Date: {leaveRequest.startDate}</Text>
      <Text>End Date: {leaveRequest.endDate}</Text>
      <Button title="Approve" onPress={handleApprove} />
      <Button title="Reject" onPress={handleReject} />
    </View>
  );
};

export default LeaveRequestDetailScreen;
