import React from 'react';

const SelectCategory = () => {
  const [modelActive, setModelActive] = useState(true);
  return (
    <Wrapper title='Suggested Order' backIcon navigation={navigation}>
      {modelActive && (
        <Model
          modalVisible={modelActive}
          setModalVisible={setModelActive}
          title={`SELECT CATEGORY`}
          category
          //   modalData={data}
        />
      )}
    </Wrapper>
  );
};

export default SelectCategory;
