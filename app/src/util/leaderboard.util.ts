import { Question, Schema } from '../hooks/freshaf';
import { Answer, Project } from '../hooks/projects';

export class LeaderBoardUtil {
  leaderboard: LeaderBoardRow[] = [];
  pointmap: any = {};

  constructor(projects: Array<Project>, schema: Schema) {
    if (projects) {
      this.mapQuestionPoint(schema.questions);
      this.calculateProjectTotal(projects);
      this.sortLeaderBoardScore();
    }
  }

  mapQuestionPoint(questions: Array<Question>) {
    for (const q of questions) {
      let totalpoint = 0;
      for (const [key, value] of Object.entries(q.points)) {
        totalpoint += value;
      }
      this.pointmap[q.id] = totalpoint;
    }
  }

  calculateProjectTotal(projects: Array<Project>) {
    for (const project of projects) {
      const total = this.calculatePointsForSingleProject(project.answers);
      this.leaderboard.push({ projectName: project.name, score: total });
    }
  }

  calculatePointsForSingleProject(answers: Answer[]): number {
    let total = 0;
    for (const answer of answers) {
      if (answer.answer === 'yes' && this.pointmap[answer.questionId]) {
        total += this.pointmap[answer.questionId];
      }
    }
    return total;
  }

  sortLeaderBoardScore() {
    this.leaderboard.sort((a, b) => b.score - a.score);
  }

  build(): Array<LeaderBoardRow> {
    return this.leaderboard;
  }
}

export interface LeaderBoardRow {
  projectName: string;
  score: number;
}
