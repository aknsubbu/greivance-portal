import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import {
  Searchbar,
  Chip,
  Card,
  Paragraph,
  Title,
  Button,
  Menu,
  Divider,
} from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getAllPosts } from "@/functions/postFunctions";
import Post from "@/interfaces/Post";

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
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [fetchedPosts] = await Promise.all([getAllPosts()]);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = posts.filter((post) => {
      return (
        (filterOptions.title &&
          post.postTitle.toLowerCase().includes(lowercasedQuery)) ||
        (filterOptions.author &&
          post.postAuthor.toLowerCase().includes(lowercasedQuery)) ||
        (filterOptions.location &&
          post.postLocation
            .join(",")
            .toLowerCase()
            .includes(lowercasedQuery)) ||
        (filterOptions.date &&
          post.postDate.toDateString().toLowerCase().includes(lowercasedQuery))
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
        <Title>{item.postTitle}</Title>
        <Paragraph>Author: {item.postAuthor}</Paragraph>
        <Paragraph>Date: {item.postDate.toDateString()}</Paragraph>
        <Paragraph>Location: {item.postLocation}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Searchbar
          placeholder="Search posts"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.filterContainer}>
          <View style={styles.chipRow}>
            <Chip
              selected={filterOptions.title}
              onPress={() => toggleFilterOption("title")}
              style={[
                styles.chip,
                filterOptions.title
                  ? styles.selectedChip
                  : styles.unselectedChip,
              ]}
              textStyle={
                filterOptions.title
                  ? styles.selectedChipText
                  : styles.unselectedChipText
              }
            >
              Title
            </Chip>
            <Chip
              selected={filterOptions.author}
              onPress={() => toggleFilterOption("author")}
              style={[
                styles.chip,
                filterOptions.author
                  ? styles.selectedChip
                  : styles.unselectedChip,
              ]}
              textStyle={
                filterOptions.author
                  ? styles.selectedChipText
                  : styles.unselectedChipText
              }
            >
              Author
            </Chip>
            <Chip
              selected={filterOptions.location}
              onPress={() => toggleFilterOption("location")}
              style={[
                styles.chip,
                filterOptions.location
                  ? styles.selectedChip
                  : styles.unselectedChip,
              ]}
              textStyle={
                filterOptions.location
                  ? styles.selectedChipText
                  : styles.unselectedChipText
              }
            >
              Location
            </Chip>
          </View>
          <View style={styles.dateFilterContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  onPress={() => setMenuVisible(true)}
                  mode="contained"
                  style={styles.dateFilterButton}
                >
                  Date Filter
                </Button>
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
          keyExtractor={(item) => item._id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  chip: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: "#e6dff6",
    borderColor: "#2980b9",
  },
  unselectedChip: {
    backgroundColor: "#ecf0f1",
    borderColor: "#bdc3c7",
  },
  selectedChipText: {
    color: "black",
  },
  unselectedChipText: {
    color: "black",
  },
  dateFilterContainer: {
    width: "100%",
  },
  dateFilterButton: {
    width: "100%",
  },
  card: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
});

export default SearchPage;
