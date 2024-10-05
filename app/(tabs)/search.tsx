import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import {
  Searchbar,
  Chip,
  Card,
  Paragraph,
  Title,
  Button,
  Menu,
  Divider,
  List,
} from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Post = {
  id: string;
  title: string;
  author: string;
  date: Date;
  location: string;
  content: string;
};

type FilterOptions = {
  title: boolean;
  author: boolean;
  date: boolean;
  location: boolean;
};

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    title: true,
    author: true,
    date: false,
    location: true,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menuVisible, setMenuVisible] = useState(false);

  // Simulated data fetching
  useEffect(() => {
    // This would typically be an API call
    const fetchedPosts: Post[] = [
      {
        id: "1",
        title: "First Post",
        author: "John Doe",
        date: new Date("2023-05-01"),
        location: "New York",
        content: "Content of first post",
      },
      {
        id: "2",
        title: "Second Post",
        author: "Jane Smith",
        date: new Date("2023-05-15"),
        location: "Los Angeles",
        content: "Content of second post",
      },
      // Add more sample posts as needed
    ];
    setPosts(fetchedPosts);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = posts.filter((post) => {
      return (
        (filterOptions.title &&
          post.title.toLowerCase().includes(lowercasedQuery)) ||
        (filterOptions.author &&
          post.author.toLowerCase().includes(lowercasedQuery)) ||
        (filterOptions.location &&
          post.location.toLowerCase().includes(lowercasedQuery)) ||
        (filterOptions.date &&
          post.date.toDateString().toLowerCase().includes(lowercasedQuery))
      );
    });
    setFilteredPosts(filtered);
  };

  const toggleFilterOption = (option: keyof FilterOptions) => {
    setFilterOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      handleSearch(selectedDate.toDateString());
    }
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Author: {item.author}</Paragraph>
        <Paragraph>Date: {item.date.toDateString()}</Paragraph>
        <Paragraph>Location: {item.location}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search posts"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.filterContainer}>
        <Chip
          selected={filterOptions.title}
          onPress={() => toggleFilterOption("title")}
          style={styles.filterChip}
        >
          Title
        </Chip>
        <Chip
          selected={filterOptions.author}
          onPress={() => toggleFilterOption("author")}
          style={styles.filterChip}
        >
          Author
        </Chip>
        <Chip
          selected={filterOptions.location}
          onPress={() => toggleFilterOption("location")}
          style={styles.filterChip}
        >
          Location
        </Chip>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button onPress={() => setMenuVisible(true)}>Date Filter</Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setDatePickerVisible(true);
              setMenuVisible(false);
            }}
            title="Select Date"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSelectedDate(new Date());
              handleSearch("");
              setMenuVisible(false);
            }}
            title="Clear Date Filter"
          />
        </Menu>
      </View>
      {datePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <FlatList
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  filterChip: {
    marginRight: 5,
    marginBottom: 5,
  },
  card: {
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
});

export default SearchPage;
