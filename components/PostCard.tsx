// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Modal,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import {
//   Avatar,
//   Paragraph,
//   IconButton,
//   Text,
//   Chip,
//   Surface,
// } from "react-native-paper";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Post from "@/interfaces/Post";

// interface PostProps {
//   post: Post;
// }

// interface Comment {
//   id: string;
//   text: string;
//   author: string;
// }

// interface CommentsModalProps {
//   visible: boolean;
//   comments: Comment[];
//   onClose: () => void;
//   onAddComment: (comment: string) => void;
// }

// const CommentsModal = ({
//   visible,
//   comments,
//   onClose,
//   onAddComment,
// }: CommentsModalProps) => {
//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       onAddComment(newComment);
//       setNewComment("");
//     }
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <TouchableOpacity
//         style={styles.modalContainer}
//         activeOpacity={1}
//         onPress={onClose}
//       >
//         <TouchableOpacity
//           activeOpacity={1}
//           style={styles.modalContent}
//           onPress={(e) => e.stopPropagation()}
//         >
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Comments</Text>
//             <IconButton
//               icon="close"
//               size={24}
//               iconColor="#fff"
//               onPress={onClose}
//             />
//           </View>
//           <FlatList
//             data={comments}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.commentItem}>
//                 <Text style={styles.commentAuthor}>{item.author}</Text>
//                 <Text style={styles.commentText}>{item.text}</Text>
//                 {item.author === "You" && (
//                   <Text style={styles.authorTag}>by you</Text>
//                 )}
//                 <TouchableOpacity style={styles.replyButton}>
//                   <Text style={styles.replyText}>Reply</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               value={newComment}
//               onChangeText={setNewComment}
//               placeholder="Add a comment ..."
//               placeholderTextColor="#777"
//             />
//             <IconButton
//               icon="send"
//               size={24}
//               iconColor="#fff"
//               onPress={handleAddComment}
//               style={styles.sendButton}
//             />
//           </View>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

// export default function PostCard({ post }: PostProps) {
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(post.postLikes.length);
//   const [commentsVisible, setCommentsVisible] = useState(false);
//   const [comments, setComments] = useState<Comment[]>(
//     post.postComments.map((comment, index) => ({
//       id: index.toString(),
//       text: comment,
//       author: "User" + (index + 1),
//     }))
//   );

//   const handleLike = () => {
//     setLiked(!liked);
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1);
//   };

//   const handleAddComment = (newComment: string) => {
//     const comment: Comment = {
//       id: (comments.length + 1).toString(),
//       text: newComment,
//       author: "You",
//     };
//     setComments([...comments, comment]);
//   };

//   return (
//     <Surface style={styles.surface} elevation={1}>
//       <View style={styles.headerContainer}>
//         <Avatar.Text size={40} label={post.postTitle.charAt(0)} />
//         <View style={styles.headerText}>
//           <Text style={styles.title}>{post.postTitle}</Text>
//           <Text style={styles.date}>
//             {new Date(post.postDate).toLocaleDateString()}
//           </Text>
//         </View>
//         <IconButton
//           icon="dots-horizontal"
//           size={20}
//           onPress={() => {}}
//           iconColor="#63519f"
//         />
//       </View>

//       <Paragraph style={styles.description}>{post.postDescription}</Paragraph>

//       <View style={styles.tagsContainer}>
//         {post.postTags.map((tag, index) => (
//           <Chip
//             key={index}
//             style={styles.tag}
//             textStyle={styles.tagText}
//             mode="outlined"
//           >
//             #{tag}
//           </Chip>
//         ))}
//       </View>

//       {post.postLocation.length > 0 && (
//         <View style={styles.locationContainer}>
//           <MaterialCommunityIcons
//             name="map-marker-outline"
//             size={16}
//             color="#63519f"
//           />
//           <Text style={styles.locationText}>
//             {post.postLocation.join(", ")}
//           </Text>
//         </View>
//       )}

//       <View style={styles.actionsContainer}>
//         <View style={styles.actionGroup}>
//           <IconButton
//             icon="comment-outline"
//             size={20}
//             onPress={() => setCommentsVisible(true)}
//             iconColor="#63519f"
//           />
//           <Text style={styles.actionText}>{comments.length}</Text>
//         </View>
//         <View style={styles.actionGroup}>
//           <IconButton
//             icon="repeat"
//             size={20}
//             onPress={() => {}}
//             iconColor="#63519f"
//           />
//           <Text style={styles.actionText}>0</Text>
//         </View>
//         <View style={styles.actionGroup}>
//           <IconButton
//             icon={liked ? "heart" : "heart-outline"}
//             size={20}
//             onPress={handleLike}
//             iconColor={liked ? "#ff6b6b" : "#63519f"}
//           />
//           <Text style={styles.actionText}>{likeCount}</Text>
//         </View>
//         <IconButton
//           icon="share-variant-outline"
//           size={20}
//           onPress={() => {}}
//           iconColor="#63519f"
//         />
//         <View style={styles.viewsContainer}>
//           <MaterialCommunityIcons
//             name="eye-outline"
//             size={16}
//             color="#63519f"
//           />
//           <Text style={styles.viewsText}>{post.postViewCounter}</Text>
//         </View>
//       </View>

//       <CommentsModal
//         visible={commentsVisible}
//         comments={comments}
//         onClose={() => setCommentsVisible(false)}
//         onAddComment={handleAddComment}
//       />
//     </Surface>
//   );
// }

// const styles = StyleSheet.create({
//   surface: {
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 16,
//     backgroundColor: "#e6dff6",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   headerText: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   date: {
//     fontSize: 12,
//     color: "#000",
//     marginTop: 2,
//   },
//   description: {
//     fontSize: 14,
//     marginBottom: 16,
//     lineHeight: 20,
//     color: "#000000",
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 16,
//   },
//   tag: {
//     marginRight: 8,
//     marginBottom: 8,
//     backgroundColor: "transparent",
//     borderColor: "#4a4a4a",
//   },
//   tagText: {
//     fontSize: 12,
//     color: "#63519f",
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   locationText: {
//     fontSize: 12,
//     color: "#000",
//     marginLeft: 4,
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   actionGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   actionText: {
//     fontSize: 12,
//     color: "#000",
//     marginLeft: -8,
//   },
//   viewsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   viewsText: {
//     fontSize: 12,
//     color: "#000",
//     marginLeft: 4,
//   },
//   commentItem: {
//     marginBottom: 15,
//   },
//   commentAuthor: {
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 5,
//   },
//   commentText: {
//     color: "#e0e0e0",
//   },
//   authorTag: {
//     color: "#b3b3b3",
//     fontSize: 12,
//     marginTop: 2,
//   },
//   replyButton: {
//     marginTop: 5,
//   },
//   replyText: {
//     color: "#b3b3b3",
//     fontSize: 14,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#1c1c1e",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderTopColor: "#333",
//     paddingTop: 15,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#2c2c2e",
//     borderRadius: 20,
//     padding: 10,
//     color: "#fff",
//     marginRight: 10,
//   },
//   sendButton: {
//     margin: 0,
//   },
// });

import React, { useState } from "react";
import { Share } from "react-native";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Paragraph,
  IconButton,
  Text,
  Chip,
  Surface,
  useTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Post from "@/interfaces/Post";

interface PostProps {
  post: Post;
}

interface Comment {
  id: string;
  text: string;
  author: string;
}

interface CommentsModalProps {
  visible: boolean;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (comment: string) => void;
}

const CommentsModal = ({
  visible,
  comments,
  onClose,
  onAddComment,
}: CommentsModalProps) => {
  const theme = useTheme();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const modalStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: theme.colors.elevation.level3,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: "90%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
    commentItem: {
      marginBottom: 15,
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.elevation.level1,
    },
    commentAuthor: {
      fontWeight: "bold",
      color: theme.colors.onSurface,
      marginBottom: 5,
    },
    commentText: {
      color: theme.colors.onSurfaceVariant,
    },
    authorTag: {
      color: theme.colors.primary,
      fontSize: 12,
      marginTop: 2,
    },
    replyButton: {
      marginTop: 5,
    },
    replyText: {
      color: theme.colors.primary,
      fontSize: 14,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
      paddingTop: 15,
      marginTop: 10,
    },
    input: {
      flex: 1,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 20,
      padding: 10,
      color: theme.colors.onSurface,
      marginRight: 10,
    },
    sendButton: {
      margin: 0,
      backgroundColor: theme.colors.primaryContainer,
    },
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity
        style={modalStyles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={modalStyles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Comments</Text>
            <IconButton
              icon="close"
              size={24}
              iconColor={theme.colors.onSurface}
              onPress={onClose}
            />
          </View>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={modalStyles.commentItem}>
                <Text style={modalStyles.commentAuthor}>{item.author}</Text>
                <Text style={modalStyles.commentText}>{item.text}</Text>
                {item.author === "You" && (
                  <Text style={modalStyles.authorTag}>by you</Text>
                )}
                <TouchableOpacity style={modalStyles.replyButton}>
                  <Text style={modalStyles.replyText}>Reply</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={modalStyles.inputContainer}>
            <TextInput
              style={modalStyles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment ..."
              placeholderTextColor={theme.colors.onSurfaceDisabled}
            />
            <IconButton
              icon="send"
              size={24}
              iconColor={theme.colors.onPrimaryContainer}
              onPress={handleAddComment}
              style={modalStyles.sendButton}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default function PostCard({ post }: PostProps) {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.postLikes.length);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    post.postComments.map((comment, index) => ({
      id: index.toString(),
      text: comment,
      author: "User" + (index + 1),
    }))
  );

  const handleShare = async () => {
    try {
      // Create a shareable text with post details
      const shareText = `${post.postTitle}\n\n${post.postDescription.substring(
        0,
        100
      )}${post.postDescription.length > 100 ? "..." : ""}\n\n${post.postTags
        .map((tag) => `#${tag}`)
        .join(" ")}`;

      // Add location if available
      const locationText =
        post.postLocation.length > 0
          ? `\n📍 ${post.postLocation.join(", ")}`
          : "";

      // Open the native share dialog
      const result = await Share.share({
        message: shareText + locationText,
        title: post.postTitle,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log(`Shared via ${result.activityType}`);
        } else {
          // Shared
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = (newComment: string) => {
    const comment: Comment = {
      id: (comments.length + 1).toString(),
      text: newComment,
      author: "You",
    };
    setComments([...comments, comment]);
  };

  const styles = StyleSheet.create({
    surface: {
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 12,
      padding: 16,
      backgroundColor: theme.colors.primaryContainer,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    headerText: {
      flex: 1,
      marginLeft: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.onPrimaryContainer,
    },
    date: {
      fontSize: 12,
      color: theme.colors.onPrimaryContainer,
      marginTop: 2,
      opacity: 0.7,
    },
    description: {
      fontSize: 14,
      marginBottom: 16,
      lineHeight: 20,
      color: theme.colors.onPrimaryContainer,
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 16,
    },
    tag: {
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.colors.outline,
    },
    tagText: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    locationText: {
      fontSize: 12,
      color: theme.colors.onPrimaryContainer,
      marginLeft: 4,
      opacity: 0.8,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
    },
    actionGroup: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionText: {
      fontSize: 12,
      color: theme.colors.onPrimaryContainer,
      marginLeft: -8,
    },
    viewsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    viewsText: {
      fontSize: 12,
      color: theme.colors.onPrimaryContainer,
      marginLeft: 4,
      opacity: 0.8,
    },
  });

  return (
    <Surface style={styles.surface} elevation={1}>
      <View style={styles.headerContainer}>
        <Avatar.Text
          size={40}
          label={post.postTitle.charAt(0)}
          color={theme.colors.onPrimary}
          style={{ backgroundColor: theme.colors.primary }}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{post.postTitle}</Text>
          <Text style={styles.date}>
            {new Date(post.postDate).toLocaleDateString()}
          </Text>
        </View>
        <IconButton
          icon="dots-horizontal"
          size={20}
          onPress={() => {}}
          iconColor={theme.colors.primary}
        />
      </View>

      <Paragraph style={styles.description}>{post.postDescription}</Paragraph>

      <View style={styles.tagsContainer}>
        {post.postTags.map((tag, index) => (
          <Chip
            key={index}
            style={styles.tag}
            textStyle={styles.tagText}
            mode="outlined"
          >
            #{tag}
          </Chip>
        ))}
      </View>

      {post.postLocation.length > 0 && (
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={16}
            color={theme.colors.primary}
          />
          <Text style={styles.locationText}>
            {post.postLocation.join(", ")}
          </Text>
        </View>
      )}

      <View style={styles.actionsContainer}>
        <View style={styles.actionGroup}>
          <IconButton
            icon="comment-outline"
            size={20}
            onPress={() => setCommentsVisible(true)}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.actionText}>{comments.length}</Text>
        </View>
        <View style={styles.actionGroup}>
          <IconButton
            icon="repeat"
            size={20}
            onPress={() => {}}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.actionText}>0</Text>
        </View>
        <View style={styles.actionGroup}>
          <IconButton
            icon={liked ? "heart" : "heart-outline"}
            size={20}
            onPress={handleLike}
            iconColor={liked ? "#ff6b6b" : theme.colors.primary}
          />
          <Text style={styles.actionText}>{likeCount}</Text>
        </View>
        <IconButton
          icon="share-variant-outline"
          size={20}
          onPress={handleShare}
          iconColor={theme.colors.primary}
        />
        <View style={styles.viewsContainer}>
          <MaterialCommunityIcons
            name="eye-outline"
            size={16}
            color={theme.colors.primary}
          />
          <Text style={styles.viewsText}>{post.postViewCounter}</Text>
        </View>
      </View>

      <CommentsModal
        visible={commentsVisible}
        comments={comments}
        onClose={() => setCommentsVisible(false)}
        onAddComment={handleAddComment}
      />
    </Surface>
  );
}
