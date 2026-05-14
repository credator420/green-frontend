import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonList, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '', age: '' });
  const history = useHistory();

  const handleRegister = async () => {
    // Scrub data immediately
    const username = form.username.trim().toLowerCase();
    const password = form.password.trim();
    const age = form.age.trim();

    if (!username || !password || !age) {
      alert("Please fill in all fields.");
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 21) {
      alert("You must be 21+ to enter the community.");
      return;
    }

    try {
      const data = await registerUser({ username, password, age: ageNum });
      if (data.id) {
        alert("Account created! Welcome to the group.");
        history.push('/login');
      } else {
        alert("Error: " + (data.error || "Username taken."));
      }
    } catch (err) {
      alert("Backend connection failed.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput 
              value={form.username} 
              onIonInput={e => setForm({...form, username: e.detail.value!})} 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput 
              type="password" 
              value={form.password} 
              onIonInput={e => setForm({...form, password: e.detail.value!})} 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Age</IonLabel>
            <IonInput 
              type="number" 
              value={form.age} 
              onIonInput={e => setForm({...form, age: e.detail.value!})} 
            />
          </IonItem>
        </IonList>
        <div className="ion-padding-top">
          <IonButton expand="block" color="success" onClick={handleRegister}>
            Create Account
          </IonButton>
          <IonButton expand="block" fill="clear" onClick={() => history.push('/login')}>
            Already a member? Log In
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;