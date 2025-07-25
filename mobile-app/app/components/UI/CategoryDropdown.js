import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button, Provider } from 'react-native-paper';

export default function CategoryDropdown({ selected, onSelect }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const categories = ['Electronics', 'Furniture', 'Office Supplies'];

  return (
    <Provider>
      <View style={{ marginVertical: 10 }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button mode="outlined" onPress={openMenu}>
              {selected || 'Select Category'}
            </Button>
          }>
          {categories.map((cat) => (
            <Menu.Item
              key={cat}
              onPress={() => {
                onSelect(cat);
                closeMenu();
              }}
              title={cat}
            />
          ))}
        </Menu>
      </View>
    </Provider>
  );
}
