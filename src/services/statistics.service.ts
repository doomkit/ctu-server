import { ProfileStats } from '../models/profile';

export class StatisticService {
	/* Return average time spent on test in seconds */
	calculateAvgDuration(
		data: { start_date: string; complete_date: string }[]
	): number {
		const max_duration_seconds = 3600;
		let sum = 0;
		let count = 0;
		data.forEach((res) => {
			let diff = Math.round(
				(+new Date(res.complete_date) - +new Date(res.start_date)) / 1000
			);
			if (diff < max_duration_seconds) {
				sum = sum + diff;
				count++;
			}
		});
		return Math.round(sum / count);
	}

	calculateAvgProfile(profiles: ProfileStats[]): ProfileStats {
		if (!profiles! || profiles.length === 0) {
			return new ProfileStats();
		}
		let profile: ProfileStats = profiles.reduce(
			(p1: ProfileStats, p2: ProfileStats) => {
				return {
					communication: p1.communication + p2.communication,
					experience: p1.experience + p2.experience,
					expectations: p1.expectations + p2.expectations,
					knowledge: p1.knowledge + p2.knowledge,
					people: p1.people + p2.people,
					resources: p1.resources + p2.resources,
					specificity: p1.specificity + p2.specificity,
				};
			}
		);
		const l = profiles.length;
		const result: ProfileStats = {
			communication: Math.round((profile.communication * 10) / l) / 10,
			experience: Math.round((profile.experience * 10) / l) / 10,
			expectations: Math.round((profile.expectations * 10) / l) / 10,
			knowledge: Math.round((profile.knowledge * 10) / l) / 10,
			people: Math.round((profile.people * 10) / l) / 10,
			resources: Math.round((profile.resources * 10) / l) / 10,
			specificity: Math.round((profile.specificity * 10) / l) / 10,
		};
		return result;
	}
}
