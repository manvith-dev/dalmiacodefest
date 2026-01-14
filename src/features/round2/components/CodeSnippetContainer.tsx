import CodeSnippet from "@/features/round2/components/CodeSnippet";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function CodeSnippetContainer() {
  const code = `from collections import deque

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.adj = [[] for _ in range(vertices)]

    def add_edge(self, u, v):
        self.adj[u].append(v)
        self.adj[v].append(u)  # undirected

    def dfs_util(self, v, visited):
        visited[v] = True
        print(v, end=' ')

        for u in self.adj[v]:
            if not visited[u]:
                self.dfs_util(u, visited)

    def DFS(self, start):
        visited = [False] * self.V
        self.dfs_util(start, visited)

    def BFS(self, start):
        visited = [False] * self.V
        queue = deque([start])
        visited[start] = True

        while queue:
            v = queue.popleft()
            print(v, end=' ')

            for u in self.adj[v]:
                if not visited[u]:
                    visited[u] = True
                    queue.append(u)

if __name__ == "__main__":
    g = Graph(6)
    g.add_edge(0, 1)
    g.add_edge(0, 2)
    g.add_edge(1, 3)
    g.add_edge(1, 4)
    g.add_edge(2, 4)
    g.add_edge(3, 5)

    print("DFS starting from vertex 0:", end=' ')
    g.DFS(0)
    print("\\nBFS starting from vertex 0:", end=' ')
    g.BFS(0)
`;
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(code);
      toast.success("Text copied to clipboard");
    } catch {
      toast.success("Text Not Copied");
    }
  };
  return (
    <section className="bg-card flex-1 flex flex-col min-w-0 rounded-md">
      <div className="bg-card flex flex-row items-center justify-between w-full py-2 px-4 rounded-t-md ">
        <span>Code</span>
        <Button size={"sm"} variant={"ghost"} onClick={handleCopy}>
          Copy
        </Button>
      </div>

      {/* Code Container */}
      <div className="flex-1 min-h-0 overflow-y-scroll scrollbar m-2">
        <CodeSnippet code={code} language="python" />
      </div>
    </section>
  );
}
