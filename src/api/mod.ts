import { Router, RouterContext } from "oak";
import { getPosts, createPost, makeSample } from "./posts.ts";
const router = new Router();

router.get("/posts", ...getPosts);
router.get("/posts/sample", ...makeSample);
router.post("/posts", ...createPost);

export default router;
