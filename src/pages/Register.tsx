import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonList, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '', age: '' });
  const history = useHistory();

  const handleRegister = async () => {
    // 1. CLEAN THE DATA (Matches your Login logic)
    const cleanUsername = form.username.trim().toLowerCase();
    const cleanPassword = form.password.trim();
    const cleanAge = form.age.trim();

    // 2. BASIC VALIDATION
    if (!cleanUsername || !cleanPassword || !cleanAge) {
      alert("Please fill in all fields.");
      return;
    }

    const ageNum = parseInt(cleanAge);
    if (isNaN(ageNum) || ageNum < 21) {
      alert("You must be 21+ to join the community.");
      return;
    }

    try {
      // 3. SEND CLEAN DATA TO API
      const data = await registerUser({
        username: cleanUsername,
        password: cleanPassword,
        age: ageNum
      });
      
      if (data.id) {
        alert("Welcome to the community! Please log in now.");
        history.push('/login'); // Move to login screen
      } else {
        alert("Error: " + (data.error || "Username already taken or database error."));
      }
    } catch (err) {
      alert("Could not reach the server. Make sure your ThinkPad backend is running!");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Join the Community</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <p>Verify your age and choose a username.</p>
        </div>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput 
              value={form.username} 
              onIonChange={e => setForm({...form, username: e.detail.value || ''})} 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput 
              type="password" 
              value={form.password} 
              onIonChange={e => setForm({...form, password: e.detail.value || ''})} 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Age</IonLabel>
            <IonInput 
              type="number" 
              value={form.age} 
              onIonChange={e => setForm({...form, age: e.detail.value || ''})} 
            />
          </IonItem>
        </IonList>
        <div className="ion-padding-top">
          <IonButton expand="block" color="success" onClick={handleRegister}>
            Create Account
          </IonButton>
          <IonButton expand="block" fill="clear" onClick={() => history.push('/login')}>
            Already have an account? Log In
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;