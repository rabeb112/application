import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoleSelectionScreen from "./screens/RoleSelectionScreen/RoleSelectionScreen";
import EmployeeSignInScreen from "./screens/AuthentificationScreens/EmployeeSignInScreen";
import RHSignInScreen from "./screens/AuthentificationScreens/RHSignInScreen";
import RHSignUpScreen from "./screens/AuthentificationScreens/RHSignUpScreen";
import PasswordResetScreen from "./screens/AuthentificationScreens/PasswordResetScreen";
import DocumentScreen from "./screens/EmployeeScreens/DocumentScreen";
import LeaveRequestScreen from "./screens/EmployeeScreens/LeaveRequestScreen";
import MessagingScreen from "./screens/EmployeeScreens/MessagingScreen";
import PayrollNotificationsScreen from "./screens/EmployeeScreens/PayRollNotificationsScreen";
import ProfileScreen from "./screens/EmployeeScreens/ProfileScreen";
import EmployeeHomeScreen from "./screens/EmployeeScreens/EmployeeHomeScreen";
import RHHomeScreen from "./screens/RHScreens/RHHomeScreen";
import ContractDeclarationScreen from "./screens/RHScreens/ContractDeclarationScreen";
import EmployeeManagementScreen from "./screens/RHScreens/EmployeeManagementScreen";
import AccidentFormScreen from "./screens/RHScreens/AccidentFormScreen";
import HRProfileScreen from "./screens/RHScreens/RHProfileScreen";
import EmployeeListScreen from "./screens/RHScreens/EmployeeListScreen";
import LeaveRequestsScreen from "./screens/RHScreens/LeaveRequestsScreen";
import LeaveRequestDetailScreen from "./screens/RHScreens/LeaveRequestDetailScreen";
import VariableManagementScreen from "./screens/RHScreens/VariableManagementScreen";
import AddEmployeeScreen from "./screens/RHScreens/AddEmployeeScreen";
import EmployeeMessagingScreen from "./screens/MessagingScreens/EmployeeMessagingScreen";
import HRMessagingScreen from "./screens/MessagingScreens/HRMessagingScreen";
import HRMessageViewerScreen from "./screens/MessagingScreens/HRMessagViewerScreen";
import LogoComponent from "./components/LogoComponent";
import NotificationIcon from "./components/NotificationIcon";
import PaymentHistoryScreen from "./screens/EmployeeScreens/PaymentHistoryScreen";
import CalendarScreen from "./screens/EmployeeScreens/CalendarScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{ headerShown: false }}
      />

      {/* Authentication Screens */}
      <Stack.Screen
        name="EmployeeSignIn"
        component={EmployeeSignInScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="RHSignIn"
        component={RHSignInScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, 
          },
        })}
      />
      <Stack.Screen
        name="RHSignUp"
        component={RHSignUpScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />

      {/* Employee Screens */}
      <Stack.Screen
        name="EmployeeHome"
        component={EmployeeHomeScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRight: () => <NotificationIcon navigation={navigation} />, // Render your notification icon component
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="LeaveRequest"
        component={LeaveRequestScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="Document"
        component={DocumentScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="Messaging"
        component={MessagingScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen
        name="PayrollNotifications"
        component={PayrollNotificationsScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />

      {/* HR Screens */}
      <Stack.Screen
        name="EmployeeList"
        component={EmployeeListScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="RHHome"
        component={RHHomeScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="AddEmployee"
        component={AddEmployeeScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="EmployeeManagement"
        component={EmployeeManagementScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="ContractDeclaration"
        component={ContractDeclarationScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen
        name="VariableManagement"
        component={VariableManagementScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
     
      <Stack.Screen name="HRProfile" component={HRProfileScreen}
      options={({ navigation }) => ({
        headerTitle: (props) => <LogoComponent {...props} />,
        headerTitleAlign: "center",
        headerTintColor: "#007BFF",
        headerRightContainerStyle: {
          marginRight: 10, // Adjust the margin as needed
        },
      })} />
      <Stack.Screen name="LeaveRequests" component={LeaveRequestsScreen}
      options={({ navigation }) => ({
        headerTitle: (props) => <LogoComponent {...props} />,
        headerTitleAlign: "center",
        headerTintColor: "#007BFF",
        headerRightContainerStyle: {
          marginRight: 10, // Adjust the margin as needed
        },
      })} />
       <Stack.Screen
  name="LeaveRequestDetail"
  component={LeaveRequestDetailScreen}
  options={({ navigation }) => ({
    headerTitle: (props) => <LogoComponent {...props} />,
    headerTitleAlign: "center",
    headerTintColor: "#007BFF",
    headerRightContainerStyle: {
      marginRight: 10, // Adjust the margin as needed
    },
  })}
/>
<Stack.Screen name="AccidentForm" component={AccidentFormScreen}
      options={({ navigation }) => ({
        headerTitle: (props) => <LogoComponent {...props} />,
        headerTitleAlign: "center",
        headerTintColor: "#007BFF",
        headerRightContainerStyle: {
          marginRight: 10, // Adjust the margin as needed
        },
      })} />

      {/* Messaging Screens */}
      <Stack.Screen
        name="EmployeeMessaging"
        component={EmployeeMessagingScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoComponent {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "#007BFF",
          headerRightContainerStyle: {
            marginRight: 10, // Adjust the margin as needed
          },
        })}
      />
      <Stack.Screen name="HRMessaging" component={HRMessagingScreen} />
      <Stack.Screen name="HRMessageViewer" component={HRMessageViewerScreen} />
    </Stack.Navigator>
  );
}
export { AppNavigator };
