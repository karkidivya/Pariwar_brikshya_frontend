import React from 'react';

const FamilyTree = ({ members, onSelectMember }) => {
  // Build tree structure from flat array
  const buildTree = () => {
    const memberMap = {};
    
    // Create a map of all members
    members.forEach(member => {
      memberMap[member._id] = { ...member, children: [] };
    });
    
    // Build parent-child relationships
    const roots = [];
    members.forEach(member => {
      if (member.parentId && memberMap[member.parentId]) {
        memberMap[member.parentId].children.push(memberMap[member._id]);
      } else if (!member.parentId) {
        roots.push(memberMap[member._id]);
      }
    });
    
    return roots;
  };

  const renderMember = (member, level = 0) => {
    return (
      <div key={member._id} className="tree-node">
        <div
          className={`member-card ${member.gender}`}
          onClick={() => onSelectMember(member)}
        >
          <h4>{member.name}</h4>
          <p>{member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : 'Birth date unknown'}</p>
          {member.occupation && <p>{member.occupation}</p>}
        </div>
        {member.children && member.children.length > 0 && (
          <div className="tree-children">
            {member.children.map(child => renderMember(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const treeData = buildTree();

  return (
    <div className="tree-container">
      {treeData.length > 0 ? (
        treeData.map(root => renderMember(root))
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>No family members found. Start by adding family members without parents to create root nodes.</p>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;