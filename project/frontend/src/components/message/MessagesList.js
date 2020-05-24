import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, updateUserMessage } from '../../store/actions/user/userMessagesActions';
import Spinner from '../spinner/Spinner';
import MessageCard from './messageCard/MessageCard';

const moment = require('moment');

function MessagesList({ userMessages, profileData, getMessages, update, loading, error }) {
  useEffect(() => {
    getMessages(profileData.id);
  }, [profileData.id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div />;
  }
  const nonReadMessages = userMessages.filter(message => message.isRead === false);

  const onMessageClose = id => {
    const res = update({ isRead: true }, id);
    if (res) {
      nonReadMessages.filter(message => message.id === res.id);
    }
  };

  return nonReadMessages.map(message => {
    const slotDate = moment(message.Order.Slot.start).format('LL');
    const slotStartTime = moment(message.Order.Slot.start).format('HH:mm');
    const slotEndTime = moment(message.Order.Slot.end).format('HH:mm');
    const period = `${slotDate} ${slotStartTime} - ${slotEndTime}`;
    return (
      <MessageCard
        key={message.id}
        messageType={`${message.type} ORDER`}
        id={message.Order.Timetable.id}
        timetableTitle={message.Order.Timetable.title}
        period={period}
        onClose={() => onMessageClose(message.id)}
      />
    );
  });
}

const mapStateToProps = state => ({
  profileData: state.profile.profileData,
  userMessages: state.messages.messages,
  loading: state.messages.loading,
  error: state.messages.error,
});

const mapDispatchToProps = {
  getMessages: fetchMessages,
  update: updateUserMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
