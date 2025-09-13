import React, { useState, useEffect } from 'react';
import FamilyTree from '../components/FamilyTree';
import AddMember from '../components/AddMember';
import MemberCard from '../components/MemberCard';
import api from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get('/family/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast.error('Failed to fetch family members');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (memberData) => {
    try {
      const response = await api.post('/family/members', memberData);
      setMembers([...members, response.data]);
      setShowAddModal(false);
      toast.success('Member added successfully');
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error('Failed to add member');
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    
    try {
      await api.delete(`/family/members/${id}`);
      setMembers(members.filter(m => m._id !== id));
      setSelectedMember(null);
      toast.success('Member deleted successfully');
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error('Failed to delete member');
    }
  };

  if (loading) {
    return <div className="loading">Loading your family tree...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Family Tree</h1>
        <button className="btn" onClick={() => setShowAddModal(true)}>
          + Add Family Member
        </button>
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <h3>Family Members ({members.length})</h3>
          {members.length === 0 ? (
            <p style={{ color: '#666', fontSize: '14px' }}>
              No members yet. Add your first family member to get started.
            </p>
          ) : (
            members.map(member => (
              <MemberCard
                key={member._id}
                member={member}
                onClick={setSelectedMember}
              />
            ))
          )}
        </div>

        <div className="main-content">
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Family Tree View</h3>
          {members.length > 0 ? (
            <FamilyTree members={members} onSelectMember={setSelectedMember} />
          ) : (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2 style={{ color: '#666' }}>No family members yet</h2>
              <p style={{ color: '#999' }}>Start building your family tree by adding your first family member</p>
              <button 
                className="btn" 
                style={{ width: 'auto', marginTop: '20px', padding: '10px 30px' }}
                onClick={() => setShowAddModal(true)}
              >
                Add First Member
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddMember
          members={members}
          onAdd={handleAddMember}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedMember.name}</h2>
              <button className="modal-close" onClick={() => setSelectedMember(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Gender:</strong> {selectedMember.gender}</p>
              {selectedMember.dateOfBirth && (
                <p><strong>Birth Date:</strong> {new Date(selectedMember.dateOfBirth).toLocaleDateString()}</p>
              )}
              {selectedMember.dateOfDeath && (
                <p><strong>Death Date:</strong> {new Date(selectedMember.dateOfDeath).toLocaleDateString()}</p>
              )}
              {selectedMember.occupation && (
                <p><strong>Occupation:</strong> {selectedMember.occupation}</p>
              )}
              {selectedMember.location && (
                <p><strong>Location:</strong> {selectedMember.location}</p>
              )}
              {selectedMember.email && (
                <p><strong>Email:</strong> {selectedMember.email}</p>
              )}
              {selectedMember.phoneNumber && (
                <p><strong>Phone:</strong> {selectedMember.phoneNumber}</p>
              )}
              {selectedMember.notes && (
                <p><strong>Notes:</strong> {selectedMember.notes}</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteMember(selectedMember._id)}
              >
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;