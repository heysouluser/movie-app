import React from 'react';
// создадим котекст
const { Provider: GenreProvider, Consumer: GenreConsumer } = React.createContext();

export { GenreProvider, GenreConsumer };
