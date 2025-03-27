// import React, { useState, useEffect, useCallback } from "react";
// import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
// import {
//   Searchbar,
//   Chip,
//   Card,
//   Paragraph,
//   Title,
//   Button,
//   Menu,
//   Divider,
//   ActivityIndicator,
// } from "react-native-paper";
// import DateTimePicker, {
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
// import { getAllPosts } from "@/functions/postFunctions";
// import Post from "@/interfaces/Post";

// type FilterOptions = {
//   title: boolean;
//   author: boolean;
//   date: boolean;
//   location: boolean;
// };

// const SearchPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({
//     title: true,
//     author: true,
//     date: false,
//     location: true,
//   });
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
//   const [datePickerVisible, setDatePickerVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const fetchedPosts = await getAllPosts();
//       setPosts(fetchedPosts);
//       setFilteredPosts(fetchedPosts); // Initialize filtered posts with all posts
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     loadData();
//   }, [loadData]);

//   // Apply filters whenever search query, filter options, or selected date changes
//   useEffect(() => {
//     filterPosts();
//   }, [searchQuery, filterOptions, selectedDate, posts]);

//   const filterPosts = () => {
//     const lowercasedQuery = searchQuery.toLowerCase().trim();

//     const filtered = posts.filter((post) => {
//       // If no search query and no date selected, return all posts
//       if (lowercasedQuery === "" && !selectedDate) {
//         return true;
//       }

//       // Check if post matches the search query based on enabled filters
//       const matchesQuery =
//         lowercasedQuery === "" ||
//         (filterOptions.title &&
//           post.postTitle.toLowerCase().includes(lowercasedQuery)) ||
//         (filterOptions.author &&
//           post.postAuthor.toLowerCase().includes(lowercasedQuery)) ||
//         (filterOptions.location &&
//           post.postLocation.join(",").toLowerCase().includes(lowercasedQuery));

//       // Check if post matches the selected date
//       const matchesDate =
//         !selectedDate ||
//         (filterOptions.date &&
//           new Date(post.postDate).toDateString() ===
//             selectedDate.toDateString());

//       return matchesQuery && matchesDate;
//     });

//     setFilteredPosts(filtered);
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   const toggleFilterOption = (option: keyof FilterOptions) => {
//     setFilterOptions((prev) => ({ ...prev, [option]: !prev[option] }));
//   };

//   const handleDateChange = (
//     event: DateTimePickerEvent,
//     selectedDate?: Date
//   ) => {
//     setDatePickerVisible(false);
//     if (selectedDate) {
//       setSelectedDate(selectedDate);
//       setFilterOptions((prev) => ({ ...prev, date: true })); // Enable date filter
//     }
//   };

//   const clearDateFilter = () => {
//     setSelectedDate(null);
//     setFilterOptions((prev) => ({ ...prev, date: false }));
//   };

//   const renderPostItem = ({ item }: { item: Post }) => (
//     <Card style={styles.card}>
//       <Card.Content>
//         <Title>{item.postTitle}</Title>
//         <Paragraph>Author: {item.postAuthor}</Paragraph>
//         <Paragraph>Date: {new Date(item.postDate).toDateString()}</Paragraph>
//         <Paragraph>Location: {item.postLocation.join(", ")}</Paragraph>
//       </Card.Content>
//     </Card>
//   );

//   const renderEmptyList = () => (
//     <View style={styles.emptyContainer}>
//       <Title style={styles.emptyText}>No posts found</Title>
//       <Paragraph>Try adjusting your search criteria</Paragraph>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Searchbar
//           placeholder="Search posts"
//           onChangeText={handleSearch}
//           value={searchQuery}
//           style={styles.searchBar}
//         />
//         <View style={styles.filterContainer}>
//           <View style={styles.chipRow}>
//             <Chip
//               selected={filterOptions.title}
//               onPress={() => toggleFilterOption("title")}
//               style={[
//                 styles.chip,
//                 filterOptions.title
//                   ? styles.selectedChip
//                   : styles.unselectedChip,
//               ]}
//               textStyle={
//                 filterOptions.title
//                   ? styles.selectedChipText
//                   : styles.unselectedChipText
//               }
//             >
//               Title
//             </Chip>
//             <Chip
//               selected={filterOptions.author}
//               onPress={() => toggleFilterOption("author")}
//               style={[
//                 styles.chip,
//                 filterOptions.author
//                   ? styles.selectedChip
//                   : styles.unselectedChip,
//               ]}
//               textStyle={
//                 filterOptions.author
//                   ? styles.selectedChipText
//                   : styles.unselectedChipText
//               }
//             >
//               Author
//             </Chip>
//             <Chip
//               selected={filterOptions.location}
//               onPress={() => toggleFilterOption("location")}
//               style={[
//                 styles.chip,
//                 filterOptions.location
//                   ? styles.selectedChip
//                   : styles.unselectedChip,
//               ]}
//               textStyle={
//                 filterOptions.location
//                   ? styles.selectedChipText
//                   : styles.unselectedChipText
//               }
//             >
//               Location
//             </Chip>
//           </View>
//           <View style={styles.dateFilterContainer}>
//             <Menu
//               visible={menuVisible}
//               onDismiss={() => setMenuVisible(false)}
//               anchor={
//                 <Button
//                   onPress={() => setMenuVisible(true)}
//                   mode="contained"
//                   style={styles.dateFilterButton}
//                   icon={selectedDate ? "calendar-check" : "calendar"}
//                 >
//                   {selectedDate ? selectedDate.toDateString() : "Date Filter"}
//                 </Button>
//               }
//             >
//               <Menu.Item
//                 onPress={() => {
//                   setDatePickerVisible(true);
//                   setMenuVisible(false);
//                 }}
//                 title="Select Date"
//               />
//               <Divider />
//               <Menu.Item
//                 onPress={() => {
//                   clearDateFilter();
//                   setMenuVisible(false);
//                 }}
//                 title="Clear Date Filter"
//               />
//             </Menu>
//           </View>
//         </View>
//         {datePickerVisible && (
//           <DateTimePicker
//             value={selectedDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={handleDateChange}
//           />
//         )}

//         {loading ? (
//           <ActivityIndicator size="large" style={styles.loader} />
//         ) : (
//           <FlatList
//             data={filteredPosts}
//             renderItem={renderPostItem}
//             keyExtractor={(item) => item._id}
//             style={styles.list}
//             ListEmptyComponent={renderEmptyList}
//             onRefresh={onRefresh}
//             refreshing={refreshing}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   content: {
//     padding: 16,
//     flex: 1,
//   },
//   searchBar: {
//     marginBottom: 16,
//   },
//   filterContainer: {
//     marginBottom: 16,
//   },
//   chipRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   chip: {
//     flex: 1,
//     marginHorizontal: 4,
//     borderWidth: 1,
//   },
//   selectedChip: {
//     backgroundColor: "#e6dff6",
//     borderColor: "#2980b9",
//   },
//   unselectedChip: {
//     backgroundColor: "#ecf0f1",
//     borderColor: "#bdc3c7",
//   },
//   selectedChipText: {
//     color: "black",
//   },
//   unselectedChipText: {
//     color: "black",
//   },
//   dateFilterContainer: {
//     width: "100%",
//   },
//   dateFilterButton: {
//     width: "100%",
//   },
//   card: {
//     marginBottom: 16,
//   },
//   list: {
//     flex: 1,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   emptyText: {
//     marginBottom: 8,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default SearchPage;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  Searchbar,
  Chip,
  Card,
  Text,
  Title,
  Button,
  Menu,
  Divider,
  ActivityIndicator,
  useTheme,
  Surface,
  IconButton,
  Avatar,
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
  const theme = useTheme();
  const styles = createStyles(theme);

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts); // Initialize filtered posts with all posts
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

  // Apply filters whenever search query, filter options, or selected date changes
  useEffect(() => {
    filterPosts();
  }, [searchQuery, filterOptions, selectedDate, posts]);

  const filterPosts = () => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();

    const filtered = posts.filter((post) => {
      // If no search query and no date selected, return all posts
      if (lowercasedQuery === "" && !selectedDate) {
        return true;
      }

      // Check if post matches the search query based on enabled filters
      const matchesQuery =
        lowercasedQuery === "" ||
        (filterOptions.title &&
          post.postTitle.toLowerCase().includes(lowercasedQuery)) ||
        (filterOptions.author &&
          post.postAuthor.toLowerCase().includes(lowercasedQuery)) ||
        (filterOptions.location &&
          post.postLocation.join(",").toLowerCase().includes(lowercasedQuery));

      // Check if post matches the selected date
      const matchesDate =
        !selectedDate ||
        (filterOptions.date &&
          new Date(post.postDate).toDateString() ===
            selectedDate.toDateString());

      return matchesQuery && matchesDate;
    });

    setFilteredPosts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
      setFilterOptions((prev) => ({ ...prev, date: true })); // Enable date filter
    }
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
    setFilterOptions((prev) => ({ ...prev, date: false }));
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <Card style={styles.card} mode="outlined">
      {item.postImage && (
        <Card.Cover source={{ uri: item.postImage }} style={styles.cardCover} />
      )}
      <Card.Content style={styles.cardContent}>
        <Title style={styles.cardTitle}>{item.postTitle}</Title>

        <View style={styles.authorRow}>
          <Avatar.Icon
            size={24}
            icon="account"
            style={styles.authorAvatar}
            color={theme.colors.onPrimary}
          />
          <Text style={styles.authorText}>{item.postAuthor}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <IconButton
              icon="calendar"
              size={16}
              style={styles.infoIcon}
              iconColor={theme.colors.primary}
            />
            <Text style={styles.infoText}>
              {new Date(item.postDate).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <IconButton
              icon="map-marker"
              size={16}
              style={styles.infoIcon}
              iconColor={theme.colors.primary}
            />
            <Text style={styles.infoText}>
              {item.postLocation?.join(", ") || "No location"}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderEmptyList = () => (
    <Surface style={styles.emptyContainer} elevation={0}>
      <IconButton
        icon="magnify-off"
        size={48}
        iconColor={theme.colors.onSurfaceDisabled}
      />
      <Title style={styles.emptyTitle}>No posts found</Title>
      <Text style={styles.emptyText}>Try adjusting your search criteria</Text>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />

      <Surface style={styles.header} elevation={1}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          Search Posts
        </Text>
      </Surface>

      <View style={styles.content}>
        <Searchbar
          placeholder="Search by title, author, location..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
          inputStyle={styles.searchInput}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          elevation={1}
        />

        <Surface style={styles.filterSurface} elevation={1}>
          <Text variant="titleMedium" style={styles.filterTitle}>
            Filter by:
          </Text>

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
              showSelectedCheck={true}
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
              showSelectedCheck={true}
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
              showSelectedCheck={true}
            >
              Location
            </Chip>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.dateFilterContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  onPress={() => setMenuVisible(true)}
                  mode={selectedDate ? "contained" : "outlined"}
                  style={styles.dateFilterButton}
                  icon={selectedDate ? "calendar-check" : "calendar"}
                  labelStyle={styles.dateButtonLabel}
                >
                  {selectedDate
                    ? `Date: ${selectedDate.toLocaleDateString()}`
                    : "Select Date Filter"}
                </Button>
              }
              contentStyle={styles.menuContent}
            >
              <Menu.Item
                onPress={() => {
                  setDatePickerVisible(true);
                  setMenuVisible(false);
                }}
                title="Select Date"
                leadingIcon="calendar-search"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  clearDateFilter();
                  setMenuVisible(false);
                }}
                title="Clear Date Filter"
                leadingIcon="calendar-remove"
              />
            </Menu>
          </View>
        </Surface>

        {datePickerVisible && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              style={styles.loader}
            />
            <Text style={styles.loaderText}>Loading posts...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPosts}
            renderItem={renderPostItem}
            keyExtractor={(item) => item._id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyList}
            onRefresh={onRefresh}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: 6,
      paddingTop: 20,
      paddingBottom: 16,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
    },
    headerTitle: {
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    content: {
      padding: 16,
      flex: 1,
    },
    searchBar: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
    },
    searchInput: {
      color: theme.colors.onSurface,
      fontSize: 16,
    },
    filterSurface: {
      marginBottom: 16,
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    filterTitle: {
      marginBottom: 12,
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    filterContainer: {
      marginBottom: 16,
    },
    chipRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    chip: {
      flex: 1,
      marginHorizontal: 4,
      borderWidth: 1,
    },
    selectedChip: {
      backgroundColor: theme.colors.primaryContainer,
      borderColor: theme.colors.primary,
    },
    unselectedChip: {
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.colors.outline,
    },
    selectedChipText: {
      color: theme.colors.onPrimaryContainer,
      fontWeight: "bold",
    },
    unselectedChipText: {
      color: theme.colors.onSurfaceVariant,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
      marginVertical: 12,
    },
    dateFilterContainer: {
      width: "100%",
    },
    dateFilterButton: {
      width: "100%",
      borderColor: theme.colors.outline,
      borderRadius: 8,
    },
    dateButtonLabel: {
      fontSize: 14,
    },
    menuContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderColor: theme.colors.outlineVariant,
      overflow: "hidden",
    },
    cardCover: {
      height: 140,
    },
    cardContent: {
      padding: 12,
    },
    cardTitle: {
      color: theme.colors.onSurface,
      fontSize: 18,
      marginBottom: 12,
    },
    authorRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    authorAvatar: {
      backgroundColor: theme.colors.primary,
      marginRight: 8,
    },
    authorText: {
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    infoRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 8,
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
      marginBottom: 4,
    },
    infoIcon: {
      margin: 0,
      padding: 0,
    },
    infoText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingBottom: 20,
    },
    separator: {
      height: 12,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
      backgroundColor: "transparent",
    },
    emptyTitle: {
      color: theme.colors.onSurfaceVariant,
      marginTop: 16,
      marginBottom: 8,
      textAlign: "center",
    },
    emptyText: {
      color: theme.colors.onSurfaceDisabled,
      textAlign: "center",
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loader: {
      marginBottom: 16,
    },
    loaderText: {
      color: theme.colors.onSurfaceVariant,
    },
  });

export default SearchPage;
