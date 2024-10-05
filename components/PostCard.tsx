import React, { useState } from "react";
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
  useTheme,
  Surface,
  Button,
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
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Comments</Text>
            <IconButton
              icon="close"
              size={24}
              iconColor="#fff"
              onPress={onClose}
            />
          </View>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentAuthor}>{item.author}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
                {item.author === "You" && (
                  <Text style={styles.authorTag}>by you</Text>
                )}
                <TouchableOpacity style={styles.replyButton}>
                  <Text style={styles.replyText}>Reply</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment ..."
              placeholderTextColor="#777"
            />
            <IconButton
              icon="send"
              size={24}
              iconColor="#fff"
              onPress={handleAddComment}
              style={styles.sendButton}
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

  return (
    <Surface style={styles.surface} elevation={1}>
      <View style={styles.headerContainer}>
        <Avatar.Text size={40} label={post.postTitle.charAt(0)} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{post.postTitle}</Text>
          <Text style={styles.date}>
            {new Date(post.postDate).toLocaleDateString()}
          </Text>
        </View>
        <IconButton icon="dots-horizontal" size={20} onPress={() => {}} />
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
          />
          <Text style={styles.actionText}>{comments.length}</Text>
        </View>
        <View style={styles.actionGroup}>
          <IconButton icon="repeat" size={20} onPress={() => {}} />
          <Text style={styles.actionText}>0</Text>
        </View>
        <View style={styles.actionGroup}>
          <IconButton
            icon={liked ? "heart" : "heart-outline"}
            size={20}
            onPress={handleLike}
            iconColor={liked ? theme.colors.error : theme.colors.backdrop}
          />
          <Text style={styles.actionText}>{likeCount}</Text>
        </View>
        <IconButton icon="share-variant-outline" size={20} onPress={() => {}} />
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

const styles = StyleSheet.create({
  surface: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
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
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  tagText: {
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    color: "gray",
    marginLeft: -8,
  },
  viewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewsText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
  },

  commentItem: {
    marginBottom: 15,
  },
  commentAuthor: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  commentText: {
    color: "#fff",
  },
  authorTag: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },
  replyButton: {
    marginTop: 5,
  },
  replyText: {
    color: "#777",
    fontSize: 14,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#1c1c1e",
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
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#2c2c2e",
    borderRadius: 20,
    padding: 10,
    color: "#fff",
    marginRight: 10,
  },
  sendButton: {
    margin: 0,
  },
});
