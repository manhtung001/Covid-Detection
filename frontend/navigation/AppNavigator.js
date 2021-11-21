import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import Constants from 'expo-constants';

const { clientEmail, privateKey, projectId } = Constants.manifest.extra;

export default function AppNavigator() {
  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      clientEmail,
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDf1jE5E8xUM14c\nW4hXyMjLmzUXI24wMs8GGwjewQb6TSmqcqoTdEgPIXc+MtskZndlbYao3OXVIPAh\nB2k0XSPQM0c9FET07kGPZqw2slfSrtkSNWKuqIGXDFU0oT+H2WR0lPFr8xnRNU7N\nvoGoQT/YWKpwxZfATkPXHszNQxZAULASM6yQwKgEGvzbjyfRulc6ZneYugN2upWG\nT4+CgYGKC+LffmstIQBhBiI329Jz3HJb0DzD7aSUp2u9+OEpzO89798kC4MroZZm\nSqohl96Z5U1iyzTeeGKc40vM0dDzChfxClFxJYzCTzXFidCrhAZCap1yoO6v+JxD\nhVpp74rnAgMBAAECggEAT3r4GYNdL5zZ0wnxfPJP0nR3QpMTIkw4VLuux6IU/zX9\nEIgMukG1AKJqfAyE4gT8amicw0NE3QwIGEJQagaUm+5JYnfbEHm1j9zuU7G6G5Z4\nf82zD7/H3EHF051aOLvJvtfQbftxdGcQZ2A5G+ynZgP96XNQMjnYPv+xy0UCFq2l\npXD8vWUGgXhKyRISCxXfwuIzVhYkoPSkuf3O2j7LQnhHCkOxN2heuYcXP2JppUCd\nIGXS8UorMJEarFNhrzAuuOsCLo/7IIDH2O2lvGzHQIrROv0owVVObIdtG+L94m/c\nCOIjJN0uqEeezw63tFyUY+kcfQoD6JlhGtq1+kPaIQKBgQD//e5gyRYo8btrwS9a\nFsEhFQ3VamYvgvdJ/HnW/jpo2bRfTTOxesb6keLkOLupO+U6GqalNFURuiK1c4rg\noZ7bL3Sn3Fz8Odb4KpGSqzFEhJsCwqy4vzqR7rvndwqMy5vSxChamDDOqL4cCg9c\ngUhEqJML5jjdD0V35FQZdlicUQKBgQDf2ABRo6FBvJz4dnPg/bdiYgFRT5EPxgeM\nMbkyhrOobwCJL9k5g5pMi6ZRwoPOWwW/ZkH89EY0i+dBNx9msLVeDAUkoJl8aVD9\nPVLdYJ0POjJ6LFH4s2v6LVujiASb+tYUaVouTXZLIBCysPSs6tUks7A/SzApzP80\neXbhNjC9twKBgQCC0m6EH7+nZQH2618blw1TrsLHEfzuwutFcDWD3aBT/Q3ktjt4\ns9oEK5HcN/IPZoCa1Qvc2YWv7YPXXxjV+0KHmRTww/jxHU3yvS5v2fTvoyTkoEBM\nmc2AzpRQkdFeap9TctN8mNI4ipu9EJcRGzCnhc7AAgOFVUyXHKSt7oESQQKBgAul\nn46f5voWqEw9TZY9XVdfJhZm/3NEqIvg4nQAkkSHUg3RUYoukM6+zW6fomAQWGI3\nHePdifGd/fBkv9uGAkncckAPoyzYBgDHOhKOvl1Wd93nhHReUZX42jXOE/9Rs+Xn\n/Ws/WJJcHsJNds2wglqghuEkNmNWaUj/sPHS8gJNAoGBANDH94HllE6Wel2BplaZ\np+3vYkIe3+WTUQutZ4O5v5WEGsdrq+XIxb+9SjWy7HdwYi+ZPZerq0gfcJI2atTH\nScopyt9+WSjMa4Lm8EYYa8qptPUf1w6sXFjLi/s02RzkQP/0TStg0FCcOR7NOatK\nL/d8EVrS/YEXoGNxqz1Ttekz\n-----END PRIVATE KEY-----\n',
      Dialogflow_V2.LANG_ENGLISH_US,
      projectId,
    );
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
