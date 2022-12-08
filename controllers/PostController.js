import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).populate("user").exec();

    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Unsuccessful Get All Post" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Unsuccessful Get All Post" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({ _id: postId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Cant Delete this Post" });
      }

      if (!doc) {
        return res.status(404).json({ msg: "Post not consist" });
      }

      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewCount: 1 } },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Cant Get this Pos t" });
        }
        if (!doc) {
          return res.status(404).json({ msg: "Post not consist" });
        }
        res.json(doc);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful Get That Post" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(" "),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful creating Post" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Unsuccessful Update Post" });
  }
};
