import React from 'react';

const MemberCard = ({ member, onClick }) => {
  return (
    <div 
      className={`member-card ${member.gender}`}
      onClick={() => onClick(member)}
    >
      <h4>{member.name}</h4>
      <p>{member.dateOfBirth ? new Date(member.dateOfBirth).getFullYear() : 'Year unknown'}</p>
      {member.occupation && <p>{member.occupation}</p>}
    </div>
  );
};

export default MemberCard;