SELECT C.ID, C.UserName, P.UserName AS ParentUserName
FROM USER C
LEFT JOIN USER P ON C.Parent = P.ID;