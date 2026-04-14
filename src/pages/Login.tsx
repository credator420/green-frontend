import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonList, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Better for React/Ionic navigation
import { loginUser } from '../services/api';

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const history = useHistory();

  const handleLogin = async () => {
    // 1. CLEAN THE DATA (The most important part)
    const cleanUsername = form.username.trim().toLowerCase();
    const cleanPassword = form.password.trim();

    if (!cleanUsername || !cleanPassword) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const data = await loginUser({ username: cleanUsername, password: cleanPassword });

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert("Blazing... You are in!");
        // 2. USE HISTORY (Smoother than window.location)
        history.push('/tabs/tab1'); 
      } else {
        alert("Invalid login. Check your credentials.");
      }
    } catch (err) {
      alert("Could not reach the server. Is your ThinkPad running the backend?");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Stoner Community</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Welcome Back</h2>
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
        </IonList>
        <div style={{ marginTop: '20px' }}>
          <IonButton expand="block" color="success" onClick={handleLogin}>Log In</IonButton>
          <IonButton expand="block" fill="clear" onClick={() => history.push('/register')}>
            New here? Sign Up
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;