import { Router, RouterContext } from "oak";
import { getPosts } from "./posts.ts";
const router = new Router();

router.get("/posts", ...getPosts);

export default router;
