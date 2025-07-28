export const OSAlgorithms = () => {
  return [
    {
      "name": "FCFS",
      "description": "First-Come-First-Serve: Schedules processes in the order they arrive for execution...",
      "gfgLink": "https://www.geeksforgeeks.org/first-come-first-serve-cpu-scheduling-non-preemptive/"
    },
    {
      "name": "SJF",
      "description": "Shortest Job First: Schedules the process with the shortest burst time first...",
      "gfgLink": "https://www.geeksforgeeks.org/shortest-job-first-cpu-scheduling-with-predicted-burst-time/"
    },
    {
      "name": "SRJF",
      "description": "Shortest Remaining Job First: A preemptive version of SJF, where  process ...",
      "gfgLink": "https://www.geeksforgeeks.org/shortest-remaining-time-first-preemptive-sjf-scheduling-algorithm/"
    },
    {
      "name": "RR",
      "description": "Round Robin: Allocates a fixed time slice (quantum) to each process in a cyclic manner...",
      "gfgLink": "https://www.geeksforgeeks.org/round-robin-scheduling-with-different-arrival-times/"
    },
    {
      "name": "Priority",
      "description": "Priority Scheduling: Assigns priority levels to processes, scheduling higher-priority... ",
      "gfgLink": "https://www.geeksforgeeks.org/priority-cpu-scheduling-with-different-arrival-time-set-2/"
    },
    {
        "name": "MLQ",
        "description": "Multilevel Queue Scheduling: Divides processes into multiple priority levels ...",
        "gfgLink": "https://www.geeksforgeeks.org/multilevel-queue-mlq-cpu-scheduling/"
    }
  ]
}

export const sortingALgo=()=>{
  return [
    {
      "name": "Bubble Sort",
      "description": "A simple sorting algorithm that repeatedly steps through the list, compares... ",
      "gfgLink": "https://www.geeksforgeeks.org/bubble-sort/"
    },
    {
      "name": "QuickSort",
      "description": "An efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot'...",
      "gfgLink": "https://www.geeksforgeeks.org/quick-sort/"
    },
    {
      "name": "Merge Sort",
      "description": "A divide-and-conquer sorting algorithm that divides the input array into...",
      "gfgLink": "https://www.geeksforgeeks.org/merge-sort/"
    },
    {
      "name": "Heap Sort",
      "description": "A comparison-based sorting algorithm that uses a binary heap data structure...",
      "gfgLink": "https://www.geeksforgeeks.org/heap-sort/"
    }
  ]
}

export const searchingAlgo=()=>{
    return [
      {
        "name": "Binary Search",
        "description": "A search algorithm that finds the position of a target value within a sorted array...",
        "gfgLink": "https://www.geeksforgeeks.org/binary-search/"
      },
      {
        "name": "Depth-First Search (DFS)",
        "description": "An algorithm for traversing or searching tree or graph data structures...",
        "gfgLink": "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/"
      },
      {
        "name": "Breadth-First Search (BFS)",
        "description": "An algorithm for traversing or searching tree or graph data structures. It explores...",
        "gfgLink": "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
      },
      {
        "name": "Dijkstra's Algorithm",
        "description": "A shortest-path algorithm that finds the shortest path between two nodes in a graph...",
        "gfgLink": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"
      },
      {
        "name": "Linear Search",
        "description": "A simple search algorithm that sequentially checks each element of a list until... ",
        "gfgLink": "https://www.geeksforgeeks.org/linear-search/"
      }
    ]
}

export const dpAlgo=()=>{
  return [
    {
      "name": "Longest Common Subsequence (LCS)",
      "description": "A problem in dynamic programming that finds the length of the longest subsequence common ...",
      "gfgLink": "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/"
    },
    {
      "name": "Knapsack Problem",
      "description": "A problem in combinatorial optimization and dynamic programming that models a knapsack with a fixed...",
      "gfgLink": "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/"
    },
    {
      "name": "Fibonacci Sequence",
      "description": "A series of numbers in which each number is the sum of the two preceding ones, often...",
      "gfgLink": "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/"
    },
    {
      "name": "Matrix Chain Multiplication",
      "description": "A problem in dynamic programming that finds the most efficient way to multiply a given...",
      "gfgLink": "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/"
    }
  ]
}

export const btAlgo=()=>{
  return[
    {
      "name": "N-Queens Problem",
      "description": "A classic problem in which the goal is to place N chess queens on an N X N chessboard...",
      "gfgLink": "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/"
    },
    {
      "name": "Sudoku Solver",
      "description": "An algorithm for solving Sudoku puzzles by backtracking and trying out different possibilities.",
      "gfgLink": "https://www.geeksforgeeks.org/sudoku-backtracking-7/"
    },
    {
      "name": "Hamiltonian Cycle",
      "description": "A problem in graph theory that asks whether a Hamiltonian cycle exists in a given graph...",
      "gfgLink": "https://www.geeksforgeeks.org/hamiltonian-cycle-backtracking-6/"
    },
    {
      "name": "Subset Sum Problem",
      "description": "A decision problem in combinatorics and computer science that asks whether there exists...",
      "gfgLink": "https://www.geeksforgeeks.org/subset-sum-backtracking-4/"
    }
  ]
}

export const graphAlgo=()=>{
  return[      
    {
      "name": "Dijkstra's Algorithm",
      "description": "A shortest-path algorithm that finds the shortest path between two nodes in a graph... ",
      "gfgLink": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"
    },
    {
      "name": "Bellman-Ford Algorithm",
      "description": "A single-source shortest path algorithm that can handle negative edge weights.... ",
      "gfgLink": "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/"
    },
    {
      "name": "Floyd-Warshall Algorithm",
      "description": "An algorithm for finding shortest paths in a weighted graph with positive or... ",
      "gfgLink": "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/"
    },
    {
      "name": "Prim's Algorithm",
      "description": "A greedy algorithm that finds a minimum spanning tree for a weighted undirected... ",
      "gfgLink": "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/"
    },
    {
      "name": "Kruskal's Algorithm",
      "description": "A greedy algorithm that finds a minimum spanning tree for a connected, undirected graph... ",
      "gfgLink": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/"
    },
  ]
}

export const aiAlgo=()=>{
    return[
        {
			"name": "A* Search Algorithm",
			"description": "A best-first search algorithm that uses a heuristic to efficiently find ...",
			"gfgLink": "https://www.geeksforgeeks.org/a-search-algorithm/"
		},	
		{
			"name": "Decision Trees",
			"description": "A decision support tool that uses a tree-like model of decisions and their possible consequences...",
			"gfgLink": "https://www.geeksforgeeks.org/decision-tree-introduction-example/"
		},
		{
			"name": "K-Nearest Neighbors",
			"description": "A non-parametric classification algorithm that is used for both classification and...",
			"gfgLink": "https://www.geeksforgeeks.org/k-nearest-neighbours/"
		},
		{
			"name": "Artificial Neural Networks",
			"description": "A computational model inspired by the structure and functioning of the human brain...",
			"gfgLink": "https://www.geeksforgeeks.org/artificial-neural-networks-and-its-applications/"
		},
		{
			"name": "K-Means Clustering",
			"description": "A type of unsupervised learning algorithm used for clustering or partitioning data...",
			"gfgLink": "https://www.geeksforgeeks.org/k-means-clustering-introduction/"
		},
		{
			"name": "Genetic Algorithms",
			"description": "A heuristic search algorithm inspired by the process of natural selection, used for...",
			"gfgLink": "https://www.geeksforgeeks.org/genetic-algorithms/"
		},
		{
			"name": "NLP",
			"description": "A field of AI that focuses on the interaction between computers and humans using... ",
			"gfgLink": "https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/"
		},
         
    ]
}