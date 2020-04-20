INSERT INTO questions(id, is_common, content_en, content_cz, specification)
VALUES
-- common questions
	(1, true, 'Has your company experience in working with academic subjects (universities, colleges)?', 'Má-li Vaše firma zkušenost se spoluprací s akademickými subjekty (univerzity, vysoké školy)?', NULL),
	(2, true, 'When was the last such cooperation?', 'Kdy taková spolupráce naposledy probíhala?', NULL),
	(3, true, 'How did this cooperation went (is going) and how do you feel about it?', ' Jak tato spolupráce dopadla/probíhá a jaký z ní máte pocit?', NULL),
	(4, true, 'Do employees, who actively participated in this cooperation, still working in your firm?', 'Jsou ve firmě stále zaměstnanci, kteří se této spolupráce aktivně účastnili?', NULL),
	(5, true, 'At what level did this cooperation take place?', 'Na jaké úrovní tato spolupráce proběhla?', NULL),
	(6, true, 'Do you keep track of the projects your company is working on?', 'Evidujete informaci o projektech, na kterých spolupracuje vaše firma?', NULL),
	(7, true, 'What output do you expect from working with the university?', 'Jaký výstup očekáváte od spolupráce s univerzitou?', NULL),
	(8, true, 'Do you have a person in your company who will be responsible for cooperation with the university on your side (contact person)?', 'Máte-li ve firmě člověka, který bude odpovědný za spolupráci s univerzitou na straně vaší firmy (kontaktní osoba)?', NULL),
	(9, true, 'Will be the contact person able to be at the university workplace?', 'Bude-li kontaktní osoba schopna být na pracovišti univerzity?', NULL),
	(10, true, 'How much time will the contact person be able to dedicate to collaboration?', 'Kolik času bude kontaktní osoba schopna věnovat spolupráce?', NULL),
	(11, true, 'How often do you plan to conduct coordination meetings?', 'Jak často plánujete provádět koordinační schůzky?', NULL),
	(12, true, 'Do you reckone with the costs (eg money, technical equipment, technology) for cooperation?', 'Počítáte s náklady (např. peníze, technické zařízení, technologie) na spolupráci?', NULL),
	(13, true, 'How many people do you think will be involved in the cooperation?', 'Kolik lidí podle Vás bude ze strany firmy do spolupráce zahrnuto?', NULL),
	(14, true, 'Will be part of their working capacity granted for collaboration?', 'Budou mít tito zaměstnanci vyhrazenu část své pracovní kapacity pro spolupráci?', NULL),
	(15, true, 'Do employees have the necessary expertise for the cooperation?', 'Mají zaměstnanci potřebné odborné znalosti pro spolupráci?', NULL),
	(16, true, 'Who do you want to include in cooperation from university?', 'Koho chcete zahrnout do spolupráce ze strany univerzity?', NULL),
	(17, true, 'Where will the cooperation take place?', 'Kde bude spolupráce probíhat?', NULL),
	(18, true, 'How will cooperation work in terms of communication?', 'Jak bude spolupráce probíhat z hlediska komunikace?', NULL),
	(19, true, 'How long do you think the cooperation will last?', 'Jak dlouho si myslíte, že bude spolupráce probíhat?', NULL),
	(20, true, 'Do you have a clear idea of what cooperation might look like?', 'Máte jasnou představu o tom, jak by spolupráce mohla vypadat?', NULL),
-- specific questions
	(21, false, 'Do you plan to support the university financially?', 'Plánujete-li finančně podporovat univerzitu?', 'management'),
	(22, false, 'Do you have a technical facility in your company that you would like to provide to a university?', 'Máte-li ve firmě technické zařízení, které byste chtěli poskytnout univerzitě?', 'management'),
	(23, false, 'Do you have internships for students in your company?', 'Máte-li ve firmě nabídky stáží pro studenty?', 'student mobility'),
	(24, false, 'Do you count on the risk of student work (do you mind longer delivery time and lower quality)?', 'Počítáte s rizikem práce studentu (nevadí Vám případně delší čas dodání a nižší kvalita)?', 'student mobility'),
	(25, false, 'Do you have experience with leading bachelor or master theses?', 'Máte zkušenost s vedením semestrálních, bakalářských nebo diplomových prací?', 'education;student mobility'),
	(26, false, 'Do you have projects in your company that you could offer to students as topics for semester, bachelor or diploma theses?', 'Máte-li ve firmě projekty, které byste mohli nabídnout studentům jako témata semestrálních, bakalářských nebo diplomových prací?', 'education;student mobility'),
	(27, false, 'Are you able to quickly find a replacement if the employee who led this project leaves, so that the student has no problem to finish the work (do you have sufficient capacity)?', 'Jste schopni v případě odchodu zaměstnance, který tento projekt vedl, rychle najít náhradu, aby student neměl problém dokončit práci (máte k tomu i dostatečnou kapacitu)?', 'education;student mobility'),
	(28, false, 'Are you interested in attending one-off events (eg: career fairs, competitions)?', 'Máte zájem o účast na jednorázových akcích (napr: kariérní veletrhy, soutěže)?', 'short-term cooperation'),
	(29, false, 'Which projects do you want to work on?', 'Na jakých projektech chcete pracovat?', 'research projects;commercial projects'),
	(30, false, 'If your employee leaves the company, are you able to quickly find a replacement with the same experience and dedicated capacity so there will be no time and quality changes in the project?', 'Pokud Váš zaměstnanec odejde z firmy, jste schopni rychle najít náhradu se stejnou zkušeností a vyhrazenou kapacitou, tj. nedojde k časovým a kvalitativním změnám v projektu?', 'education;research projects;commercial projects'),
	(31, false, 'Has your firm any scientific or research activity?', 'Dělá-li vaše firma něco v rámci vědecké nebo výzkumné činnosti?', 'education;research projects'),
	(32, false, 'Can you lead the whole subject at the faculty?', 'Dokázali byste vést celý předmět na fakultě?', 'education'),
	(33, false, 'Do employees who lead the subject have higher education?', 'Mají zaměstnanci, kteří budou vést předmět, vyšší vzdělání?', 'education'),
	(34, false, 'Are you able to guarantee stable course management for at least 3-5 years under any conditions?', 'Jste schopni za jakýchkoliv podmínek garantovat stabilní vedení předmětu během alespoň 3-5 let?', 'education'),
	(35, false, 'Would you like to give lectures on existing subjects? (1-3 lectures per semester)', 'Chtěli byste přednášet v rámci existujících předmětů? (1-3 přednášky během semestru)', 'education'),
	(36, false, 'Do you need an expert advisor from the university in your company?', 'Pociťujete nutnost odborného poradce ze strany univerzity ve vaší firmě?', 'management;employee mobility'),
	(37, false, 'Do you have courses in your company that could be adopted for students (and that are not tied to confidentiality or corporate secrecy)?', 'Máte-li ve firmě kurzy, které by šlo přizpůsobit studentům (a které nejsou vázané na mlčenlivost nebo firemní tajemství)?', 'education;short-term cooperation'),
	(38, false, 'Do you have knowledge in your company that you would like to provide to the university for research?', 'Máte-li ve firmě znalostí, které byste chtěli poskytnout univerzitě do výzkumu?', 'management;research projects'),
	(39, false, 'Does your company require a non-disclosure agreement?', 'Vyžaduje vaše firma podpis smlouvy o mlčenlivosti?', 'education;research projects;commercial projects');


INSERT INTO answers(question_id, letter, content_en, content_cz)
VALUES
-- common questions
	(1, 'a', 'Yes', 'Ano'),
	(1, 'b', 'No, but we were part of a team that worked with the academic subject', 'Ne, ale byli jsme součástí týmu, který s akademickým subjektem spolupracoval'),
	(1, 'c', 'No', 'Ne'),
	(2, 'a', 'Still in progress', 'Stále probíhá'),
	(2, 'b', 'In the last year', 'V posledním roce'),
	(2, 'c', 'In the last two years', 'V posledních dvou letech'),
	(2, 'd', 'In the last 5 years', 'V posledních 5 letech'),
	(2, 'e', 'Earlier', 'Dříve'),
	(3, 'a', 'Great - no complications, everything that was planned was accomplished', 'Výborně – žádné komplikace, vše, co bylo naplánováno, bylo dodrženo'),
	(3, 'b', 'Well - we had some problems, but the goal was achieved', 'Dobře – měli jsme některé problémy, ale cíl byl dosažen'),
	(3, 'c', 'Bad - we encountered problems in the course of cooperation and we were unable to achieve our goals', 'Špatně – narazili jsme na problémy v průběhu spolupráce a nepodařilo se nám dosáhnout stanovených cílů'),
	(4, 'a', 'Yes', 'Ano'),
	(4, 'b', 'Only part of them remained in our firm', 'Zůstala jenom část zaměstnanců'),
	(4, 'c', 'Nobody stayed', 'Nikdo se nezůstal'),
	(5, 'a', 'The cooperation was coordinated by senior management', 'Spolupráce byla koordinována vyšším managementem'),
	(5, 'b', 'It was individual concerns of some employees', 'Šlo spíše o individuální záležitost jednotlivých zaměstnanců'),
	(6, 'a', 'Yes', 'Ano'),
	(6, 'b', 'No', 'Ne'),
	(7, 'a', 'Access to technology', 'Přístup k technologiím'),
	(7, 'b', 'Knowledge of scientists', 'Znalosti vědců'),
	(7, 'c', 'Job offers', 'Pracovní nabídky'),
	(7, 'd', 'Participation in projects', 'Účast na projektech'),
	(7, 'e', 'Training for employees', 'Školení pro zaměstnance'),
	(7, 'f', 'Work for students', 'Práce pro studenty'),
	(7, 'g', 'Other', 'Jiný'),
	(8, 'a', 'Yes', 'Ano'),
	(8, 'b', 'Not yet, but the contact person will be chosen before the cooperation begins', 'Zatím ne, ale před začátkem spolupráce bude kontaktní osoba určena'),
	(8, 'c', 'We do not have a person who could become a contact person', 'Nemáme člověka, který by se mohl stát kontaktní osobou'),
	(9, 'a', 'Yes', 'Ano'),
	(9, 'b', 'We prefer the contact person to work only from the company premises', 'Preferujeme, aby kontaktní osoba pracovala jenom z prostorů firmy'),
	(10, 'a', 'As much as needed (coordination of cooperation is the primary responsibility)', 'Tolik, kolik bude potřeba (koordinace spolupráce je primární zodpovědností)'),
	(10, 'b', 'As much as is left (cooperation coordination is not the primary responsibility)', 'Tolik, kolik zbyde (koordinace spolupráce není primární zodpovědností)'),
	(10, 'c', 'We do not know yet', 'Ještě nevíme'),
	(11, 'a', 'Every week', 'Každý tyden'),
	(11, 'b', 'Every month', 'Každý měsíc'),
	(11, 'c', 'Once every six months', 'Jednou za půl roku'),
	(11, 'd', 'We will agree later', 'Domluvíme se později (nezáleží)'),
	(11, 'e', 'We are not interested (never)', 'Nemáme o to zájem (nikdy)'),
	(12, 'a', 'We want to invest', 'Chceme investovat'),
	(12, 'b', 'Yes, we are able to cover the costs that may arise during the cooperation', 'Ano, jsme schopni pokrýt náklady, které mohou vzniknout během spolupráce'),
	(12, 'c', 'Yes, but we expect the university to participate', 'Ano, ale očekáváme finanční spoluúčast univerzity'),
	(12, 'd', 'No, we do not want to invest anything', 'Ne, nechceme nic investovat'),
	(13, 'a', 'Less than 5', 'Méně než 5'),
	(13, 'b', '5-10', '5-10'),
	(13, 'c', 'More than 10', 'Více než 10'),
	(14, 'a', 'Yes', 'Ano'),
	(14, 'b', 'No', 'Ne'),
	(15, 'a', 'Yes', 'Ano'),
	(15, 'b', 'No', 'Ne'),
	(15, 'c', 'No, but we want to invest in their education', 'Ne, ale chceme investovat do jejich vzdělání'),
	(16, 'a', 'Employees, rather teachers', 'Zaměstnance, spíše vyučující'),
	(16, 'b', 'Employees, rather researchers', 'Zaměstnance, spíše výzkumníky'),
	(16, 'c', 'Students', 'Studenty'),
	(16, 'd', 'Both groups', 'Obě skupiny'),
	(17, 'a', 'University premises', 'Prostory univerzity'),
	(17, 'b', 'Company premises', 'Prostory firmy'),
	(17, 'c', 'University and company premises', 'Prostory univerzity a firmy'),
	(17, 'd', 'Outside of university and company premises', 'Mimo prostory univerzity a firmy'),
	(18, 'a', 'Personally, the presence of university and company staff at one workplace', 'Osobně, přítomnost pracovníků univerzity a firmy na jednom pracovišti'),
	(18, 'b', 'Remotely (by phone, email, video / teleconference, etc.)', 'Vzdálené (telefonicky, emailem, video/telekonference atd.)'),
	(18, 'c', 'Personally and remotely', 'Osobně a vzdáleně'),
	(19, 'a', 'Once or a couple of days', 'Jednorázově, popřípadě jednotky dnů'),
	(19, 'b', 'Several weeks', 'Několik týdnů'),
	(19, 'c', 'Half year', 'Půl roku'),
	(19, 'd', 'Several years', 'Několik let'),
	(19, 'e', 'Longer', 'Více'),
	(20, 'a', 'Yes', 'Ano'),
	(20, 'b', 'Need to be specified', 'Je potřeba doupřesnit'),
-- specific questions
	(21, 'a', 'Yes', 'Ano'),
	(21, 'b', 'No', 'Ne'),
	(22, 'a', 'Yes', 'Ano'),
	(22, 'b', 'No', 'Ne'),
	(23, 'a', 'Yes', 'Ano'),
	(23, 'b', 'No', 'Ne'),
	(24, 'a', 'Yes', 'Ano'),
	(24, 'b', 'No', 'Ne'),
	(25, 'a', 'Yes', 'Ano'),
	(25, 'b', 'No', 'Ne'),
	(26, 'a', 'Yes', 'Ano'),
	(26, 'b', 'No', 'Ne'),
	(27, 'a', 'Yes', 'Ano'),
	(27, 'b', 'No', 'Ne'),
	(28, 'a', 'Yes', 'Ano'),
	(28, 'b', 'No', 'Ne'),
	(29, 'a', 'On commercial projects', 'Na komerčních projektech'),
	(29, 'b', 'On research projects', 'Na výzkumných projektech'),
	(29, 'c', 'We do not want to work on projects', 'Nechceme pracovat na projektech'),
	(30, 'a', 'Yes', 'Ano'),
	(30, 'b', 'No, but we are taking this risk into account', 'Ne, ale s tímto rizikem počítáme'),
	(30, 'c', 'No', 'Ne'),
	(31, 'a', 'Our company participates in conferences and publishes scientific articles', 'Účastní se vědeckých konferencí a publikuje vědecké články'),
	(31, 'b', 'Our company publishes literature and study materials', 'Publikuje odbornou literaturu, studijní materiály'),
	(31, 'c', 'We have a research department that wants to cooperate', 'Máme výzkumné oddělení, které chce spolupracovat'),
	(31, 'd', 'We want to build a research department', 'Chceme vybudovat výzkumné oddělení'),
	(31, 'e', 'No', 'Ne'),
	(32, 'a', 'Yes', 'Ano'),
	(32, 'b', 'No', 'Ne'),
	(33, 'a', 'Yes, Doctorate (or higher)', 'Ano, doktorské (nebo vyšší)'),
	(33, 'b', 'Yes, Master', 'Ano, magisterské'),
	(33, 'c', 'Yes, Bachelor', 'Ano, bakalářské'),
	(33, 'd', 'No', 'Nemají vyšší vzdělání'),
	(34, 'a', 'Yes', 'Ano'),
	(34, 'b', 'No', 'Ne'),
	(35, 'a', 'Yes', 'Ano'),
	(35, 'b', 'No', 'Ne'),
	(36, 'a', 'Yes, for business management', 'Ano, pro řízení firmy'),
	(36, 'b', 'Yes, for project consultations', 'Ano, pro konzultace na projektech'),
	(36, 'c', 'Yes, to support employee education', 'Ano, pro podporu vzdělávání zaměstnanců'),
	(36, 'd', 'Yes, for research activities', 'Ano, pro výzkumné aktivity'),
	(36, 'e', 'No', 'Ne'),
	(37, 'a', 'Yes', 'Ano'),
	(37, 'b', 'No', 'Ne'),
	(38, 'a', 'Yes, we would like to share our technologies (software, licenses, technical lab, etc.)', 'Ano, chtěli bychom se podělit svými technologiemi (software, licence, technická laboratoř atd.)'),
	(38, 'b', 'Yes, we would like to share our experience (human capacity, know-how, etc.)', 'Ano, chtěli bychom se podělit svými zkušenostmi (lidská kapacita, know-how atd.)'),
	(38, 'c', 'No)', 'Ne'),
	(39, 'a', 'Yes', 'Ano'),
	(39, 'b', 'No', 'Ne');