import React from 'react';
import { Text, View, Image } from 'react-native';
import { PushLogToServer } from '../data-access/request-layer'
import ErrorComponent from './ErrorComponent';

export default class ErrorBoundary extends React.Component {
    state = { hasError: false }
  
    componentDidCatch() {
      PushLogToServer("error", "Fatal")
      this.setState({ hasError: true })
    }
  
    render() {
      if (this.state.hasError) {
        return <ErrorComponent />
      }
      return this.props.children
    }
  }