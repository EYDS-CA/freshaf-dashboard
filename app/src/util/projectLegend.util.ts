import { AppraisalProp } from '../components/generic/Appraisal';
import { AppraisalTitles, Emoji, MedalText } from '../constants/enums/enums';
import { Level, levels, Scores } from '../hooks/freshaf';

export class ProjectLegend {
  totalScore = 0;
  projectLegend = [];
  currentLevel: Level[] = [];
  constructor(scores: Scores) {
    this.makeProjectLevelArray(scores);
    this.assignLevel();
    this.assignTotalScore();
    this.assignRanking();
    this.assignMedals();
  }

  makeProjectLevelArray(scores: Scores) {
    const level: Level[] = [];
    let totalScore: number = 0;
    for (const [key] of Object.entries(scores)) {
      level.push(scores[key]?.level);
      totalScore += scores[key]?.total;
    }
    this.currentLevel = level;
    this.totalScore = totalScore;
  }

  assignLevel() {
    const medal: AppraisalProp = {
      emoji: Emoji.Gold,
      title: AppraisalTitles.ProjectLevel,
      value: MedalText.Gold,
    };
    if (this.currentLevel.includes('paper')) {
      medal.emoji = Emoji.Pop;
      medal.value = MedalText.Pop;
    } else if (this.currentLevel.includes('bronze')) {
      medal.emoji = Emoji.Bronze;
      medal.value = MedalText.Bronze;
    } else if (this.currentLevel.includes('silver')) {
      medal.emoji = Emoji.Silver;
      medal.value = MedalText.Silver;
    }
    this.projectLegend.push(medal);
  }

  assignTotalScore() {
    const totalScore: AppraisalProp = {
      emoji: Emoji.Fire,
      title: AppraisalTitles.TotalScore,
      value: this.totalScore,
    };
    this.projectLegend.push(totalScore);
  }

  assignRanking() {
    const ranking: AppraisalProp = {
      emoji: Emoji.Trophy,
      title: AppraisalTitles.Ranking,
      value: 'N/A',
    };
    this.projectLegend.push(ranking);
  }

  assignMedals() {
    const medals: AppraisalProp = {
      emoji: Emoji.Check,
      title: AppraisalTitles.TotalMedals,
      value: 'N/A',
    };
    this.projectLegend.push(medals);
  }

  build(): AppraisalProp[] {
    return this.projectLegend;
  }
}
